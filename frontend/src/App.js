import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing";
import "./App.css";
import LoginPage from "./pages/User/login";
import Signup from "./pages/User/signup";
import Dashboard from "./pages/Dashboard/dashboard";
import Donation from "./pages/Donation/donation";
import CrisisPage from "./pages/crisis/crisis";
import AddCrisis from "./pages/crisis/addCrisis";
import Volunteer from "./pages/volunteer/volunteer";
import AdminVolunteer from "./pages/Admin/adminVolunteer";
import AdminCrisisPage from "./pages/Admin/adminCrisis";
import CrisisAssign from "./pages/Admin/adminCrisisAssign";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home" element={<Dashboard />} />
                <Route path="/donation" element={<Donation />} />
                <Route path="/crisis" element={<CrisisPage />} />
                <Route path="/add_crisis" element={<AddCrisis />} />
                <Route path="/volunteer" element={<Volunteer />} />
                <Route path="/admin/volunteer" element={<AdminVolunteer />} />
                <Route path="/admin/crisis" element={<AdminCrisisPage />} />
                <Route path="/admin/crisis_assign" element={<CrisisAssign />} />
            </Routes>
        </Router>
    );
}

export default App;
