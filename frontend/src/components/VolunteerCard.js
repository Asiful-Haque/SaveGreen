import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const VolunteerCard = ({ volunteer }) => {
    return (
        

        <div className="bg-white p-5 rounded-lg shadow-lg hover:shadow-2xl w-full sm:w-[45%] md:w-[30%] cursor-pointer bg-opacity-30 transition-all duration-300 ease-in-out transform hover:-translate-y-2 ">
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
