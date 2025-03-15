import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CrisisCard from "../../components/CrisisCard";

const CrisisPage = () => {
    const navigate = useNavigate();

    const [allCrisis, setAllCrisis] = useState([]);
    const [severityFilter, setSeverityFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [filteredCrisis, setFilteredCrisis] = useState([]);


    const makeFilter = () => { //This is filtering data through conditions
        const filtered = allCrisis.filter((crisisEach) => {
            const matchesSeverity = severityFilter ? crisisEach.severity === severityFilter : true;
            const matchesStatus = statusFilter ? crisisEach.status === statusFilter : true;

            return matchesSeverity && matchesStatus;
        });

        setFilteredCrisis(filtered);
    };

    useEffect(() => {
        //This api fetches the crisis data from database
        const fetchCrisis = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/crisis/get_crisis", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (res.ok) {
                    const data = await res.json();
                    console.log("Fetched crisis data:", data);
                    setAllCrisis(data.crisis || []);
                } else {
                    console.error("Failed to fetch crisis");
                }
            } catch (error) {
                console.error("Error crisis history:", error);
            }
        };
        fetchCrisis();
    }, []);

    useEffect(() => {
        makeFilter();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [severityFilter, statusFilter, allCrisis]);

    return (
        <>
            <div>
                <div className="h-auto bg-cover bg-center bg-green-600">
                    <div className="fixed inset-0 bg-black bg-opacity-40 pointer-events-none"></div>
                    <div className="sticky top-0 bg-[#263526] p-4 flex justify-between items-center z-10 shadow-lg bg-opacity-70 shadow-md">
                        <h1 className="text-3xl font-bold text-gray-200">
                            Save<span className="text-lime-500">Green</span>
                        </h1>
                        <button
                            onClick={() => navigate("/add_crisis")}
                            className="bg-green-800 text-white py-2 px-4 rounded-full font-semibold"
                        >
                            Add Crisis
                        </button>
                    </div>

                    <div className="z-40 p-6 space-y-6">
                        <h2 className="text-center text-3xl font-bold text-black mb-4">
                            Recent Crises
                        </h2>
                        <h2 className="text-center text-xl font-bold text-black mt-6">
                            Filter Searches
                        </h2>
                        <div className="flex justify-center">
                            <select
                                value={severityFilter}
                                onChange={(e) => {
                                    setSeverityFilter(e.target.value);
                                }}
                                className="px-4 py-2 bg-red-500 outline-none"
                            >
                                <option value="">Select Severity</option>
                                <option value="Low">Low</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Acute">Acute</option>
                            </select>

                            <select
                                value={statusFilter}
                                onChange={(e) => {
                                    setStatusFilter(e.target.value);
                                }}
                                className="px-4 py-2  bg-red-500 outline-none"
                            >
                                <option value="">Select Status</option>
                                <option value="Ongoing">Ongoing</option>
                                <option value="Solved">Solved</option>
                                <option value="Tracking">Tracking</option>
                            </select>
                        </div>
                        <div className="flex flex-wrap gap-4 justify-center">
                            {filteredCrisis.map((crisisEach) => (
                                <CrisisCard crisis={crisisEach} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CrisisPage;
