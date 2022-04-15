const Track = require("./models/TrackModel");
const utils = require("../../utils/utils");

exports.rename_animal = async (req, resp) => {
    const { oldName, newName } = req.query;
    let respmsg = "An error occured.";

    if (oldName && newName) {
        const ans = await askQuestion(
            `Are you sure you want to change ${oldName} to ${newName} (Y/N)?`
        );
        if (ans.toLowerCase() == "y") {
            await Track.updateMany(
                { animalName: oldName },
                { $set: { animalName: newName } }
            );
            repsmsg = `Successfully renamed ${oldName} to ${newName}!`;
        } else {
            respmsg = "Process Aborted.";
        }
    }

    resp.send(respmsg);
};

exports.push_track_data = async (req, resp) => {
    const { file, lat, long, name, id, datetime } = req.query;
    let respmsg = "";

    if (
        file &&
        lat &&
        long &&
        name &&
        id &&
        datetime &&
        utils.isNumeric(lat) &&
        utils.isNumeric(long) &&
        utils.isNumeric(id) &&
        utils.isNumeric(datetime)
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
            await Track.insertMany(data);
            respmsg = "Data Inserted Successfully!";
        } else {
            respmsg = "Process Aborted.";
        }
    } else {
        respmsg = "Inputs Invalid.";
    }

    resp.send(respmsg);
};
