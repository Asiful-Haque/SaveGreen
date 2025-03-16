import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddCrisis() {
    const [crisisName, setCrisisName] = useState("");
    const [crisisDetails, setCrisisDetails] = useState("");
    const [severity, setSeverity] = useState("");
    const [status, setStatus] = useState("");

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        const crisisData = {
            crisisName,
            crisisDetails,
            severity,
            status,
        };
        console.log(crisisData);

        try {
            const response = await fetch("http://localhost:5000/api/crisis/set_crisis", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(crisisData),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Adding successful!");
                navigate("/crisis");
            } else {
                alert(data.message || "Adding failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during Adding:", error);
            alert("An error occurred. Please try again later.");
        }
        navigate("/crisis");
    };

    return (
        <>
            <div
                className="relative flex justify-end items-center h-screen bg-[#080710] bg-cover bg-center px-20"
                style={{ backgroundImage: "url('/donation_page.jpg')" }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative w-[45%] h-auto p-8 rounded-lg shadow-2xl backdrop-blur-md bg-white/10 border border-red-800">
                    <h3 className="text-green-500 text-3xl font-semibold text-center">
                        Add Disaster
                    </h3>

                    <form onSubmit={handleSubmit} className="mt-6">
                        <>
                            
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter crisis name"
                                className="w-full mt-2 p-3 bg-white/20 text-black rounded-md outline-none focus:ring-2 focus:ring-green-500 placeholder-black"
                                value={crisisName}
                                onChange={(e) => {
                                    setCrisisName(e.target.value);
                                }}
                            />
                            <input
                                type="text"
                                name="email"
                                placeholder="Enter Details"
                                className="w-full mt-2 p-3 bg-white/20 text-black rounded-md outline-none focus:ring-2 focus:ring-green-500 placeholder-black"
                                value={crisisDetails}
                                onChange={(e) => {
                                    setCrisisDetails(e.target.value);
                                }}
                            />
                            <select
                                value={severity}
                                onChange={(e) => {
                                    setSeverity(e.target.value);
                                }}
                                className="w-full mt-2 p-3 bg-white/20 text-black rounded-md outline-none focus:ring-2 focus:ring-green-500 placeholder-black"
                            >
                                <option value="">Select Severity</option>
                                <option value="Low">Low</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Acute">Acute</option>
                            </select>
                            <select
                                value={status}
                                onChange={(e) => {
                                    setStatus(e.target.value);
                                }}
                                className="w-full mt-2 p-3 bg-white/20 text-black rounded-md outline-none focus:ring-2 focus:ring-green-500 placeholder-black"
                            >
                                <option value="">Select Status</option>
                                <option value="Ongoing">Ongoing</option>
                                <option value="Solved">Solved</option>
                                <option value="Tracking">Tracking</option>
                            </select>

                            <div className="flex justify-center mt-6">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-800 text-black rounded-md"
                                >
                                    Confirm
                                </button>
                            </div>
                        </>
                    </form>
                </div>
            </div>
        </>
    );
}
