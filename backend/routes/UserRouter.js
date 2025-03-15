const express = require("express");
const UserController = require("../controllers/UserController");

const router = express.Router();

//registration route
router.post("/register", UserController.registerUser);

//login route
router.post("/login", UserController.loginUser);

//donation route
router.post("/donate", UserController.registerDonation);

//getting donation route
router.get("/total_donation", UserController.getDonationTotal);

module.exports = router;
