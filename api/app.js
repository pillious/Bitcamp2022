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
 
app.get("/getAnimalByName/:name", async (req, resp) => {
    let docs;
    console.log(req.params.name);
    if (req.params.name) {
        docs = await trackModel.find({ animalName: req.params.name});
    }
    resp.send(docs);
})
 
app.get("/getAnimalById/:id", async (req, reps) => {
    let docs;
    if (req.params.id) {
        docs = await trackModel.find({ animalId: req.params.id});
    }
    resp.send(docs);
});
 
//Run the application on the specified port.
app.listen(port, () => console.log(`Acaply listening on port ${port}.`));
