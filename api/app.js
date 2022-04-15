const express = require("express");
const app = express();
require("dotenv").config();

const cors = require("cors");
app.use(cors());

const connectDatabase = require("./utils/database");
connectDatabase();

const trackRoutes = require("./routes/track");
const descriptionRoutes = require("./routes/description");

app.use("/track", trackRoutes);
app.use("/desc", descriptionRoutes);

app.get("/", (req, resp) => {
    resp.send("API Started.");
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`API listening on port ${port}.`));
