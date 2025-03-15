import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const handleNameChange = (e) => {
        setFullName(e.target.value);
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password || password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        const userData = {
            fullName,
            email,
            password,
        };
        // console.log("user data is ", userData);

        try {
            const response = await fetch("http://localhost:5000/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Signup successful!");
                navigate("/");
            } else {
                alert(data.message || "Signup failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during signup:", error);
            alert("An error occurred. Please try again later.");
        }
        navigate("/");
    };

    return (
        <>
            <div
                className="relative flex justify-end items-center h-screen bg-[#080710] bg-cover bg-center px-40"
                style={{ backgroundImage: "url('/cover.png')" }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative w-96 h-auto p-8 rounded-lg shadow-2xl backdrop-blur-md bg-white/10 border border-white/20">
                    <h3 className="text-green-500 text-3xl font-semibold text-center">
                        Sign Up Here
                    </h3>

                    <form onSubmit={handleSubmit} className="mt-6">
                        <>
                            <label className="text-green-500 font-medium">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                className="w-full mt-2 p-3 bg-white/20 text-black rounded-md outline-none focus:ring-2 focus:ring-green-500 placeholder-black"
                                value={fullName}
                                onChange={handleNameChange}
                            />
                            <label className="text-green-500 font-medium mt-4 block">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="w-full mt-2 p-3 bg-white/20 text-black rounded-md outline-none focus:ring-2 focus:ring-green-500 placeholder-black"
                                value={email}
                                onChange={handleEmailChange}
                            />

                            <label className="text-green-500 font-medium mt-4 block">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="w-full mt-2 p-3 bg-white/20 text-black rounded-md outline-none focus:ring-2 focus:ring-green-500 placeholder-black"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <label className="text-green-500 font-medium mt-4 block">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                className="w-full mt-2 p-3 bg-white/20 text-black rounded-md outline-none focus:ring-2 focus:ring-green-500 placeholder-black"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                            />
                            <div className="flex justify-center mt-6">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-800 text-black rounded-md"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </>
                    </form>

                    <div className="mt-6 flex justify-center gap-4">
                        <p className="text-black z-10">
                            Already have an account?{" "}
                            <Link to="/login" className="text-blue-500 font-bold">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
