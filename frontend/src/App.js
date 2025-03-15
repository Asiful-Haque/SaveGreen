import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing";
import "./App.css";
import LoginPage from "./pages/User/login";
import Signup from "./pages/User/signup";
import Dashboard from "./pages/Dashboard/dashboard";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/user_dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
