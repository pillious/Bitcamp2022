const mongoose = require("mongoose");

const dbUsername = process.env.DATABASE_READONLY_USERNAME;
const dbPassword = process.env.DATABASE_READONLY_PASSWORD;

const connectionStr = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@animals.xu2eh.mongodb.net/animals?retryWrites=true&w=majority`;

const connectDatabase = () => {
    mongoose.connect(connectionStr);
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function () {
        console.log("Connected successfully");
    });
};

module.exports = connectDatabase;
