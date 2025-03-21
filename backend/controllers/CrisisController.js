const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getCrisis, createCrisis, approveCrisisInDb, assignVolunteersToCrisisInDb } = require("../models/CrisisModel");

const JWT_SECRET = process.env.JWT_SECRET;

const CrisisController = {};

CrisisController.addAnyCrisis = async (req, res) => {
    try {
        const { crisisName, crisisDetails, severity, status } = req.body;
        const newCrisis = await createCrisis(crisisName, crisisDetails, severity, status);
        res.status(201).json({
            message: "Crisis Added successfully",
        });
    } catch (error) {
        console.error("Error Adding crisis:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

CrisisController.getAllCrisis = async (req, res) => {
    try {
        const crisis = await getCrisis();
        if (!crisis) {
            return res.status(404).json({ message: "No crisis found" });
        }
        console.log(crisis);
        return res.status(200).json({ crisis });
    } catch (error) {
        console.error("Error showing Crisis:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

CrisisController.approveCrisis = async (req, res) => {
    const { crisis_id } = req.body;

    if (!crisis_id) {
        return res.status(400).json({ message: "crisis ID is required" });
    }

    try {
        // Call model to approve the crisis
        const result = await approveCrisisInDb(crisis_id);

        if (result) {
            return res.status(200).json({ message: "Crisis approved successfully" });
        } else {
            return res.status(404).json({ message: "Crisis not found" });
        }
    } catch (error) {
        console.error("Error approving crisis:", error);
        return res.status(500).json({ message: "Server error", error });
    }
};


CrisisController.assignVolunteers = async (req, res) => {
    const { volunteer_ids, crisis_id } = req.body;
    if (!volunteer_ids || volunteer_ids.length === 0) {
        return res.status(400).json({ message: "Please select at least one volunteer." });
    }
    if (!crisis_id) {
        return res.status(400).json({ message: "Crisis ID is required." });
    }
    try {
        const assignedVolunteers = await assignVolunteersToCrisisInDb(volunteer_ids, crisis_id);

        if (assignedVolunteers.length > 0) {
            return res.status(200).json({
                message: "Volunteers successfully assigned to the crisis.",
                assignedVolunteers,
            });
        } else {
            return res.status(404).json({ message: "Failed to assign volunteers to the crisis." });
        }
    } catch (error) {
        console.error("Error assigning volunteers:", error);
        res.status(500).json({ message: "Server error", error });
    }
};
module.exports = CrisisController;
