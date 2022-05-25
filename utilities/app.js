/*
PUSH DATA USAGE:
--------
http://localhost:3000/track/push?
file=input&lat=4&long=3&id=9&datetime=2&name=American Woodcock
--------
Note 1: name can be either a string or a number.
Note 2: file is the path to the csv file.
*/

const express = require("express");
const app = express();
require("dotenv").config();

const path = require("path");
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const connectDatabase = require("./utils/database");
connectDatabase();

const trackRoutes = require("./routes/track");
const descriptionRoutes = require("./routes/description");

app.use("/track", trackRoutes);
app.use("/desc", descriptionRoutes);

app.get("/", (req, resp) => {
    resp.send("Utilities Started.");
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Utilities listening on port ${port}.`));