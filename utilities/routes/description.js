const express = require("express");
const router = express.Router();

const description_controller = require("../controllers/description/description.controller");

router.get(
    "/addForm",
    description_controller.fetch_description_page
);

router.post("/addDescription", description_controller.add_description);
router.post("/updateDescription", description_controller.update_description);
// router.post("/deleteDescription", description_controller.delete_description);

module.exports = router;
