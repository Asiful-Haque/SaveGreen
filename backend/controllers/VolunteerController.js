const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getVolunteers } = require("../models/VolunteerModel");


const JWT_SECRET = process.env.JWT_SECRET;

const VoluneerController = {};

VoluneerController.getAllVolunteers = async (req, res) => {
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

module.exports = VoluneerController;
