const express = require("express");
const UserController = require("../controllers/UserController");

const router = express.Router();

//registration route
router.post("/register", UserController.registerUser);

//login route
router.post("/login", UserController.loginUser);

module.exports = router;
