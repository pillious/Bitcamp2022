const express = require("express");
const router = express.Router();

const track_controller = require("../controllers/track/track.controller");

router.post("/getAllDistinctNames", track_controller.distinct_animals);

router.post("/getAnimalByName/:name", track_controller.animal_by_name);

router.post("/getAnimalById/:id", track_controller.animal_by_id);

module.exports = router;