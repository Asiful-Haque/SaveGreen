const express = require("express");
const CrisisController = require("../controllers/CrisisController");

const router = express.Router();

//route for getting all the admin approved crisis
router.get("/get_crisis", CrisisController.getAllCrisis);
//route for setting any crisis
router.post("/set_crisis", CrisisController.addAnyCrisis);

module.exports = router;
