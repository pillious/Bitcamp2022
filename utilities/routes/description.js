const express = require("express");
const router = express.Router();

const description_controller = require("../controllers/description/description.controller");

router.get(
    "/fetchDescriptionPage",
    description_controller.fetch_description_page
);

router.post("/addDescription", description_controller.add_description);

module.exports = router;
