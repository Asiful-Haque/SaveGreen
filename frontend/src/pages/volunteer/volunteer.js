import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VolunteerCard from "../../components/VolunteerCard";

const Volunteer = () => {
    const navigate = useNavigate();
    const [volunteers, setVolunteers] = useState([]);

    useEffect(() => {
        //This api fetches the crisis data from database
        const fetchCrisis = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/volunteer/get_volunteers", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (res.ok) {
                    const data = await res.json();

                    // Filter the volunteers to only include approved ------optimized------
                    const approvedVolunteer =
                        data.volunteers?.filter((volunteer) => volunteer.approved === true) || [];
                    setVolunteers(approvedVolunteer);

                } else {
                    console.error("Failed to fetch volunteer");
                }
            } catch (error) {
                console.error("Error volunteer history:", error);
            }
        };
        fetchCrisis();
    }, []);
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
                            onClick={() => navigate("/add_volunteer")}
                            className="bg-green-800 text-white py-2 px-4 rounded-full font-semibold"
                        >
                            Add Volunteer
                        </button>
                    </div>

                    <div className="z-40 p-6 space-y-6">
                        <h2 className="text-center text-4xl font-bold text-white mb-4">
                            Volunteers
                        </h2>
                        <div className="flex flex-wrap gap-4 justify-center">
                            {volunteers.map((volunteer) => (
                                <VolunteerCard volunteer={volunteer} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Volunteer;
