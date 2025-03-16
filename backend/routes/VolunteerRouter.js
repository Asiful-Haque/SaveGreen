const express = require("express");
const VoluneerController = require("../controllers/VolunteerController");


const router = express.Router();

//route for getting all the volunteers
router.get("/get_volunteers", VoluneerController.getAllVolunteers);

module.exports = router;
