const express = require("express");
const CrisisController = require("../controllers/CrisisController");

const router = express.Router();

//route for getting all the admin approved crisis
router.get("/get_crisis", CrisisController.getAllCrisis);
//route for setting any crisis
router.post("/set_crisis", CrisisController.addAnyCrisis);

// Route for approving a crisis by admin
router.put("/approve_crisis", CrisisController.approveCrisis);

// Route to assign volunteers to a crisis
router.post("/assign_volunteers", CrisisController.assignVolunteers);

module.exports = router;
