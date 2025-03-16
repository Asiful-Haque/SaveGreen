const express = require("express");
const VolunteerController = require("../controllers/VolunteerController");


const router = express.Router();

//route for getting all the volunteers
router.get("/get_volunteers", VolunteerController.getAllVolunteers);

// Route for approving a volunteer
router.put("/approve_volunteer", VolunteerController.approveVolunteer);
module.exports = router;
