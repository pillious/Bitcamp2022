const express = require("express");
const app = express();
require("dotenv").config();

const cors = require("cors");
app.use(cors());

const connectDatabase = require("./config/database");
connectDatabase();

const port = process.env.PORT || 8000;

const trackRoutes = require("./routes/track");
const descriptionRoutes = require("./routes/description");

app.use("/track", trackRoutes);
app.use("/desc", descriptionRoutes);

app.get("/", (req, resp) => {
    resp.send("Application Started.");
});

app.listen(port, () => console.log(`Acaply listening on port ${port}.`));
