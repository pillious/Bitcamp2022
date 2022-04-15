const fs = require("fs");
const readline = require("readline");

const Track = require("../models/TrackModel");
const utils = require("../../../utils/utils");

exports.processLineByLine = async (file, lat, long, id, datetime, name) => {
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
            if (utils.isNumeric(name)) {
                animalName = vals[parseInt(name)].replaceAll('"', "");
            } else {
                animalName = name;
            }

            let track = new Track({
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
};

exports.askQuestion = (query) => {
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
};
