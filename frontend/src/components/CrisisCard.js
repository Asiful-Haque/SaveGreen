import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CrisisCard = ({ crisis }) => {
    
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

            <button
                className="bg-black text-white py-2 px-4 font-semibold hover:bg-red-500 hover:text-white transition duration-300"
            >
                Response
            </button>
        </div>
    );
};

export default CrisisCard;
