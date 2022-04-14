const mongoose = require("mongoose");

const TrackSchema = new mongoose.Schema(
    {
        lat: {
            type: Number,
        },
        long: {
            type: Number,
        },
        animalName: {
            type: String,
        },
        animalId: {
            type: String,
        },
        datetime: {
            type: Date,
        },
    },
    { versionKey: false }
);

const Track = mongoose.model("Track", TrackSchema);

module.exports = Track;
