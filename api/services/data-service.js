const mongoose = require("mongoose");
const RaceSchema = require("../models/race");

module.exports = class DataService {
    async get(filter) {
        mongoose.connect(process.env.DATABASE_READONLY_URI);
        const db = mongoose.connection;
        db.on("error", console.error.bind(console, "connection error: "));
        db.once("open", function () {
            console.log("Connected successfully");
        });

        const documents = await RaceSchema.find(filter).exec();

        await mongoose.disconnect();

        return documents;
    }
};
