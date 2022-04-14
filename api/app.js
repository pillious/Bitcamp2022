const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());
const trackModel = require("./models");
const port = process.env.PORT || 8000;

const dbUsername = process.env.DATABASE_READONLY_USERNAME;
const dbPassword = process.env.DATABASE_READONLY_PASSWORD;

const connection = `mongodb+srv://${dbUsername}:${dbPassword}@animals.xu2eh.mongodb.net/animals?retryWrites=true&w=majority`;

mongoose.connect(connection);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

app.get("/", (req, resp) => {
    resp.send("Application Started.");
});

const DEFAULT_LIMIT = 50;

app.post("/getAnimalByName/:name", async (req, resp) => {
    let docs;
    let query = {};
    let limit;
    if (req.params.name) {
        query.animalName = req.params.name;

        if (req.body && req.body.limit && isNumeric(req.body.limit))
            limit = parseInt(req.body.limit);
        else limit = DEFAULT_LIMIT;

        docs = await trackModel.find(query).limit(limit);
    }
    resp.send(docs);
});

app.post("/getAnimalById/:id", async (req, reps) => {
    let docs;
    let query = {};
    let limit;
    if (req.params.name) {
        query.animalId = req.params.id;

        if (req.body && req.body.limit && isNumeric(req.body.limit))
            limit = parseInt(req.body.limit);
        else limit = DEFAULT_LIMIT;

        docs = await trackModel.find(query).limit(limit);
    }

    resp.send(docs);
});

//Run the application on the specified port.
app.listen(port, () => console.log(`Acaply listening on port ${port}.`));

function isNumeric(value) {
    return /^-?\d+$/.test(value);
}
