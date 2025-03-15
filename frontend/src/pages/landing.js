import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div
            className=" w-full h-screen bg-cover bg-center"
            style={{ backgroundImage: "url('/cover.png')" }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>

            <div className="absolute top-0 left-0 w-full bg-[#263526] bg-opacity-70 shadow-md z-10">
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center py-4">
                    <h1 className="text-3xl font-bold text-gray-200">
                        Save<span className="text-lime-500">Green</span>
                    </h1>
                    <div className="hidden md:flex space-x-4">
                        <Link to="/login" className="px-4 py-2 bg-lime-600 text-white rounded-lg">
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="px-4 py-2 border border-lime-500 text-white rounded-lg"
                        >
                            Signup
                        </Link>
                    </div>
                </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-end text-white text-center px-20">
                <div>
                    <h1 className="text-5xl font-bold leading-tight">
                        Betterment of the <br />
                        <span className="text-lime-500">WORLD</span>
                    </h1>
                    <p className="mt-4 text-lg text-gray-300">
                        We are a team of volunteers making a better future.
                    </p>

                    <div className="mt-6 flex justify-center space-x-4">
                        <Link
                            to="/signup"
                            className="px-6 py-3 bg-lime-600 text-white font-medium rounded-lg"
                        >
                            Get Started
                        </Link>
                        <Link to="/" className="flex items-center px-4 py-3 text-white font-medium">
                            <span className="mr-2 text-xl">▶</span> Watch Video
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
