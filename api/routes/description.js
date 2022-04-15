const express = require("express");
const router = express.Router();

const description_controller = require("../controllers/description/description.controller");

router.post(
    "/getDescriptionByName/:name",
    description_controller.description_by_name
);

module.exports = router;