import React, { useState, useEffect } from "react";

const VolunteerAssign = ({ crisis_id }) => {
    const [volunteers, setVolunteers] = useState([]);
    const [selectedVolunteers, setSelectedVolunteers] = useState([]);

    // Fetch volunteer data on component mount
    useEffect(() => {
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
                    console.log("Fetched volunteer data:", data);
                    setVolunteers(data.volunteers || []);
                } else {
                    console.error("Failed to fetch volunteer");
                }
            } catch (error) {
                console.error("Error fetching volunteer data:", error);
            }
        };
        fetchCrisis();
    }, []);

    // Handle checkbox toggle for selecting volunteers
    const handleSelect = (volunteerId) => {
        setSelectedVolunteers((prevSelected) =>
            prevSelected.includes(volunteerId)
                ? prevSelected.filter((id) => id !== volunteerId)
                : [...prevSelected, volunteerId]
        );
    };

    // Handle the assign action
    const handleAssignAll = async () => {
        if (selectedVolunteers.length > 0) {
            try {
                const res = await fetch("http://localhost:5000/api/crisis/assign_volunteers", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        volunteer_ids: selectedVolunteers,
                        crisis_id: crisis_id,
                    }),
                });
                if (res.ok) {
                    alert("Assigned Successfully");
                    console.log("Volunteers successfully assigned!");
                    setSelectedVolunteers([]);
                } else {
                    console.error("Failed to assign volunteers");
                    alert("There is a problem. Maybe it's already added.");
                }
            } catch (error) {
                console.error("Error assigning volunteers:", error);
            }
        } else {
            alert("Please select at least one volunteer to assign.");
        }
    };

    return (
        <div>
            <div className="h-auto bg-cover bg-center bg-green-600">
                <div className="fixed inset-0 bg-black bg-opacity-40 pointer-events-none"></div>
                <div className="sticky top-0 bg-[#263526] p-4 flex justify-between items-center z-10 shadow-lg bg-opacity-70 shadow-md">
                    <h1 className="text-3xl font-bold text-gray-200">
                        Save<span className="text-lime-500">Green</span>
                    </h1>
                </div>

                <div className="z-40 p-6 space-y-6">
                    <h2 className="text-center text-4xl font-bold text-white mb-4">Volunteers</h2>

                    {volunteers.length > 0 ? (
                        volunteers.map((volunteer, index) => (
                            <div
                                key={volunteer.volunteer_id}
                                className="w-[70%] m-auto flex items-center justify-between bg-gray-100 p-5 rounded-lg shadow-sm hover:bg-gray-200 transition-all"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedVolunteers.includes(volunteer.volunteer_id)}
                                    onChange={() => handleSelect(volunteer.volunteer_id)}
                                    className="mr-4"
                                />

                                <span className="font-bold text-lg text-gray-800 w-8">
                                    {index + 1}.
                                </span>
                                <span className="text-lg font-semibold flex-1">
                                    {volunteer.volunteer_name}
                                </span>
                                <span className="text-gray-600 mr-5">Age: {volunteer.age}</span>
                                <span className="text-gray-600 mr-5">📍 {volunteer.location}</span>
                                <span className="text-gray-600 mr-5">📞 {volunteer.mobile_no}</span>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-700 font-semibold">
                            No volunteers found.
                        </p>
                    )}

                    <div className="text-center">
                        <button
                            onClick={handleAssignAll}
                            className="bg-lime-600 text-white py-2 px-6 rounded-md font-semibold mt-4"
                        >
                            Assign All
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VolunteerAssign;
