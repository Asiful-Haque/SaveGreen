import React from "react";
import { jwtDecode } from "jwt-decode";

const VolunteerCard = ({ volunteer }) => {
    async function approveAndReload() {
        try { // this approves the volunteers by admin
                const res = await fetch("http://localhost:5000/api/volunteer/approve_volunteer", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ volunteer_id: volunteer.volunteer_id }),
                });
                if (res.ok) {
                    const data = await res.json();
                    console.log("Fetched volunteer data:", data);
                    window.location.reload(); //This reloads the page for new updated data
                } else {
                    console.error("Failed to fetch volunteer");
                }
            } catch (error) {
                console.error("Error volunteer history:", error);
            }
    }

    const token = localStorage.getItem("token");
    let isAdmin = false;

    if (token) {
        try {
            const decoded = jwtDecode(token);
            if (decoded.email === "admin@gmail.com" && decoded.role === "admin") {
                isAdmin = true;
            }
        } catch (error) {
            console.error("Invalid Token", error);
        }
    }

    return (
        <div className="bg-white p-5 rounded-lg shadow-lg hover:shadow-2xl w-full sm:w-[45%] md:w-[30%] cursor-pointer bg-opacity-30 transition-all duration-300 ease-in-out transform hover:-translate-y-2 ">
            {isAdmin && !volunteer.approved && ( //conditionally button showing for approve
                <button
                    className="absolute top-3 right-3 bg-blue-600 text-white py-1 px-4 rounded-md font-semibold hover:bg-blue-700 transition-all duration-300"
                    onClick={approveAndReload}
                >
                    Approve
                </button>
            )}
            {/* Profile Image here */}
            <div className="flex justify-center">
                <img
                    src={`https://ui-avatars.com/api/?name=${volunteer.volunteer_name}&background=random&size=128`}
                    alt="Volunteer Avatar"
                    className="w-24 h-24 rounded-full shadow-md border-4 border-gray-300 object-cover"
                />
            </div>

            {/* Volunteer Information got from db */}
            <div className="text-center mt-4">
                <h3 className="text-xl font-bold text-gray-800">{volunteer.volunteer_name}</h3>
                <p className="text-gray-600 text-sm">Age: {volunteer.age}</p>
                <p className="text-gray-600 text-sm">📍 {volunteer.location}</p>
                <p className="text-gray-600 text-sm">📞 {volunteer.mobile_no}</p>
            </div>

            <div className="mt-4 flex justify-center">
                <button className="bg-green-600 text-white py-2 px-6 rounded-full font-semibold hover:bg-green-700 transition-all duration-300">
                    Contact
                </button>
            </div>
        </div>
    );
};

export default VolunteerCard;
