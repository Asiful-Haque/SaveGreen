const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getCrisis, createCrisis } = require("../models/CrisisModel");

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

module.exports = CrisisController;
