const express = require("express");
const router = express.Router();

const track_controller = require("../controllers/track/track.controller");

router.post("/push", track_controller.push_track_data);

router.post("/rename", track_controller.rename_animal);

module.exports = router;