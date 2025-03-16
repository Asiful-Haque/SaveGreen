const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findUserByEmail, createUser, createDonation, getTotalDonation, getDateWiseDonation } = require("../models/UserModel");

const JWT_SECRET = process.env.JWT_SECRET;

const UserController = {};

UserController.registerUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await createUser(
            fullName,
            email,
            hashedPassword,
        );

        res.status(201).json({
            message: "User registered successfully",
            user: { id: newUser.id, name: newUser.name, email: newUser.email },
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

UserController.registerDonation = async (req, res) => {
    try {
        const tokenFromLocalStorage = req.headers.authorization?.split(" ")[1];
        if (!tokenFromLocalStorage) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(tokenFromLocalStorage, JWT_SECRET);
        const userId = parseInt(decoded.userId, 10);

        const { fullName, email, date, amount } = req.body;
         const donation = await createDonation(fullName, email, date, amount, userId);
        res.status(201).json({
            message: "Donation registered successfully",
        });
    } catch (error) {
        console.error("Error registering Donation:", error);
        res.status(500).json({ message: "Server error", error });
    }
};


UserController.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // Assign role based on email
        const role = email === "admin@gmail.com" ? "admin" : "user";

        // Generate JWT token with role
        const token = jwt.sign({ userId: user.user_id, email: user.email, role }, JWT_SECRET, {
            expiresIn: "1h",
        });

        res.json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

UserController.getDonationTotal = async (req, res) => {
    try {
        const donation = await getTotalDonation();
        if (!donation) {
            return res.status(404).json({ message: "No Donation found" });
        }
        return res.status(200).json({ donation });
    } catch (error) {
        console.error("Error showing Donation:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

UserController.getDonationTotalByDate = async (req, res) => {
    const date = new Date().toISOString().split("T")[0];
    try {
        const totalDonation = await getDateWiseDonation(date);

        // Ensure response is in array format to match frontend expectation
        const responseData = [{ date, total_donation: totalDonation || 0 }];

        res.json(responseData);
    } catch (error) {
        console.error("Error fetching donation data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = UserController;
