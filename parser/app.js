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
const trackModel = require("./models");
 
const connection =
    `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@animals.xu2eh.mongodb.net/animals?retryWrites=true&w=majority`;
 
mongoose.connect(connection);
 
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});
 
app.listen(3000, () => {
    console.info("App running on port 3000.");
});
 
app.get("/", (req, resp) => {
    resp.send("Hello");
});
