const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getAllTaskInDb, assignVolunteersToTasksInDb } = require("../models/TaskModel");


const JWT_SECRET = process.env.JWT_SECRET;

const TaskController = {};

TaskController.getAllTask = async (req, res) => {
    try {
        const tasks = await getAllTaskInDb();
        if (!tasks) {
            return res.status(404).json({ message: "No Tasks found" });
        }
        console.log(tasks);
        return res.status(200).json({ tasks });
    } catch (error) {
        console.error("Error showing Tasks:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

TaskController.assignVolunteers = async (req, res) => {
    const { volunteer_ids, task_id } = req.body;
    if (!volunteer_ids || volunteer_ids.length === 0) {
        return res.status(400).json({ message: "Please select at least one volunteer." });
    }
    if (!task_id) {
        return res.status(400).json({ message: "Crisis ID is required." });
    }
    try {
        const assignedVolunteers = await assignVolunteersToTasksInDb(volunteer_ids, task_id);

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


module.exports = TaskController;
