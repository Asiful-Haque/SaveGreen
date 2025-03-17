const express = require("express");
const ReportController = require("../controllers/ReportController");

const router = express.Router();

//route for getting all the admin approved Tasks
router.get("/get_report", ReportController.getDonationReport);


module.exports = router;
