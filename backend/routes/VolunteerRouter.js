const express = require("express");
const VoluneerController = require("../controllers/VolunteerController");


const router = express.Router();

//route for getting all the volunteers
router.get("/get_volunteers", VoluneerController.getAllVolunteers);
//route for getting all the volunteers (approved + unapproved)
router.get("/get_app_unapp_volunteers", VoluneerController.getAllAppUnappVolunteers);

// Route for approving a volunteer
router.put("/approve_volunteer", VoluneerController.approveVolunteer);
module.exports = router;
