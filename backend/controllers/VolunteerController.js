const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getVolunteers, getAppUnappVolunteers, approveVolunteerInDb } = require("../models/VolunteerModel");


const JWT_SECRET = process.env.JWT_SECRET;

const VolunteerController = {};

VolunteerController.getAllVolunteers = async (req, res) => {
    try {
        const volunteers = await getVolunteers();
        if (!volunteers) {
            return res.status(404).json({ message: "No volunteers found" });
        }
        console.log(volunteers);
        return res.status(200).json({ volunteers });
    } catch (error) {
        console.error("Error showing volunteers:", error);
        res.status(500).json({ message: "Server error", error });
    }
};


VolunteerController.approveVolunteer = async (req, res) => {
    const { volunteer_id } = req.body; 

    if (!volunteer_id) {
        return res.status(400).json({ message: "Volunteer ID is required" });
    }

    try {
        // Call model to approve the volunteer
        const result = await approveVolunteerInDb(volunteer_id);

        if (result) {
            return res.status(200).json({ message: "Volunteer approved successfully" });
        } else {
            return res.status(404).json({ message: "Volunteer not found" });
        }
    } catch (error) {
        console.error("Error approving volunteer:", error);
        return res.status(500).json({ message: "Server error", error });
    }
};

module.exports = VolunteerController;
