import React from "react";
import { jwtDecode } from "jwt-decode";

const CrisisCard = ({ crisis }) => {
    async function approveAndReload() {
        try {
            // this approves the volunteers by admin
            const res = await fetch("http://localhost:5000/api/crisis/approve_crisis", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ crisis_id: crisis.crisis_id }),
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
        <div className="bg-white p-5 rounded-lg shadow-lg hover:shadow-2xl w-full sm:w-[45%] md:w-[30%] cursor-pointer bg-opacity-30">
            <img
                src={`https://picsum.photos/500/300?random=${Math.floor(Math.random() * 1000)}`}
                alt="Random Post"
                className="mt-3 w-full h-56 object-cover shadow-md"
            />

            <div className="mb-3 mt-3">
                <h3 className="text-xl font-semibold text-gray-900">{crisis.crisis_name}</h3>
                <p className="text-sm text-gray-600 mt-1">{crisis.crisis_details}</p>
            </div>

            {isAdmin ? (
                // If admin and crisis is not approved, show the "Approve" button
                !crisis.approval ? (
                    <button
                        className="bg-blue-600 text-white py-1 px-4 rounded-md font-semibold hover:bg-blue-700 transition-all duration-300"
                        onClick={approveAndReload}
                    >
                        Approve
                    </button>
                ) : (
                    //if approved then add assign button
                    <button className="bg-lime-600 text-white py-1 px-4 rounded-md font-semibold ">
                        Assign
                    </button>
                )
            ) : (
                // If not an admin, show the "Response" button
                <button className="bg-black text-white py-2 px-4 font-semibold hover:bg-red-500 hover:text-white transition duration-300">
                    Response
                </button>
            )}
        </div>
    );
};

export default CrisisCard;
