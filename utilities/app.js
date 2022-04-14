/*
USAGE:
--------
http://localhost:3000/push?
file=input&lat=4&long=3&id=9&datetime=2&name=American Woodcock
--------
Note 1: name can be either a string or a number.
Note 2: file is the path to the csv file.
*/

require("dotenv").config();
const express = require("express");
const app = express();
const fs = require("fs");
const readline = require("readline");
const mongoose = require("mongoose");
const path = require("path");

const trackModel = require("./models/TrackModel");
const descriptionModel = require("./models/DescriptionModel");

const port = process.env.PORT || 4000;

const connection = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@animals.xu2eh.mongodb.net/animals?retryWrites=true&w=majority`;

mongoose.connect(connection);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

app.listen(port, () => {
    console.info(`App running on port ${port}.`);
});

app.get("/", (req, resp) => {
    resp.send("Application Started.");
});

// app.get("/addDescription", (req, resp) => {
//     (__dirname + '/views/addDescription.html');
// });

app.get("/rename", async (req, resp) => {
    const { oldName, newName } = req.query;
    let respmsg = "An error occured.";

    if (oldName && newName) {
        const ans = await askQuestion(
            `Are you sure you want to change ${oldName} to ${newName} (Y/N)?`
        );
        if (ans.toLowerCase() == "y") {
            await trackModel.updateMany(
                { animalName: oldName },
                { $set: { animalName: newName } }
            );
            repsmsg = `Successfully renamed ${oldName} to ${newName}!`;
        } else {
            respmsg = "Process Aborted.";
        }
    }

    resp.send(respmsg);
});

app.get("/push", async (req, resp) => {
    const { file, lat, long, name, id, datetime } = req.query;
    let respmsg = "";

    if (
        file &&
        lat &&
        long &&
        name &&
        id &&
        datetime &&
        isNumeric(lat) &&
        isNumeric(long) &&
        isNumeric(id) &&
        isNumeric(datetime)
    ) {
        const data = await processLineByLine(
            file,
            lat,
            long,
            id,
            datetime,
            name
        );

        console.log(data); /* Allows user to check if data is correct. */
        const ans = await askQuestion(
            "Are you sure the data above is correct (Y/N)?"
        );
        if (ans.toLowerCase() == "y") {
            respmsg = await pushToDB(data);
        } else {
            respmsg = "Process Aborted.";
        }
    } else {
        respmsg = "Inputs Invalid.";
    }

    resp.send(respmsg);
});

async function processLineByLine(file, lat, long, id, datetime, name) {
    let data = [];
    const fileStream = fs.createReadStream(file + ".csv");
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    let isFirst = true;
    for await (const line of rl) {
        if (!isFirst) {
            let vals = line.split(",");

            let animalName;
            if (isNumeric(name)) {
                animalName = vals[parseInt(name)].replaceAll('"', "");
            } else {
                animalName = name;
            }

            let track = new trackModel({
                lat: vals[parseInt(lat)].replaceAll('"', ""),
                long: vals[parseInt(long)].replaceAll('"', ""),
                animalId: vals[parseInt(id)].replaceAll('"', ""),
                animalName,
                datetime: vals[parseInt(datetime)].replaceAll('"', ""),
            });

            data.push(track);
        } else {
            isFirst = false;
        }
    }

    return data;
}

function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) =>
        rl.question(query, (ans) => {
            rl.close();
            resolve(ans);
        })
    );
}

function isNumeric(value) {
    return /^-?\d+$/.test(value);
}

async function pushToDB(data) {
    await trackModel.insertMany(data);
    return "Data Inserted Successfully!";
}
