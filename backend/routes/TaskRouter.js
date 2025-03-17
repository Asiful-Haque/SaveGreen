const express = require("express");
const TaskController = require("../controllers/TaskController");

const router = express.Router();

//route for getting all the admin approved Tasks
router.get("/get_tasks", TaskController.getAllTask);

// Route to assign volunteers to a tasks
router.post("/assign_tasks", TaskController.assignVolunteers);


module.exports = router;
