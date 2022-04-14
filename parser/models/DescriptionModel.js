const mongoose = require("mongoose");

const DescriptionSchema = new mongoose.Schema(
    {
        commonName: {
            type: String,
        },
        scientificName: {
            type: String,
        },
        body: {
            type: String,
        },
        citations: {
            type: [String],
        },
    },
    { versionKey: false }
);

const Description = mongoose.model("Description", DescriptionSchema);

module.exports = Description;
