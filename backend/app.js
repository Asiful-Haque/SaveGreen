const express = require("express");
require("dotenv").config();
const cors = require("cors");

const userRouter = require("./routes/UserRouter");
const crisisRouter = require("./routes/CrisisRouter");
const volunteerRouter = require("./routes/VolunteerRouter")
const taskRouter = require("./routes/TaskRouter");
const reportRouter = require("./routes/ReportRouter");

const app = express();

// CORS Configuration
const corsOptions = {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true, 
};

app.use(cors(corsOptions)); // Apply CORS middleware with options
app.options("*", cors(corsOptions)); // Handle preflight requests

app.use(express.json()); // Parse JSON request body


app.use("/api/users", userRouter);
app.use("/api/crisis", crisisRouter);
app.use("/api/volunteer", volunteerRouter);
app.use("/api/task", taskRouter);
app.use("/api/report", reportRouter);


app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
