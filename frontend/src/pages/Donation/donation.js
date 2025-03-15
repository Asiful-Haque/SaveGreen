import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Donation() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [totalDonation, setTotalDonation] = useState(null);

    const navigate = useNavigate();

    const handleNameChange = (e) => {
        setFullName(e.target.value);
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const fetchTotalDonation = async () => {
        try {
            const response = await fetch("/api/users/total_donation");
            if (!response.ok) {
                throw new Error("Failed to fetch total donation");
            }
            const data = await response.json();
            setTotalDonation(data.donation);
        } catch (error) {
            console.error("Error:", error);
        }
    };
    useEffect(() => {
        fetchTotalDonation();
        const interval = setInterval(() => {
            fetchTotalDonation();
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const amountData = {
            fullName,
            email,
            date,
            amount,
        };
        console.log(amountData);

        try {
            const response = await fetch("http://localhost:5000/api/users/donate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(amountData),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Donation successful!");
                navigate("/");
            } else {
                alert(data.message || "Donation failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during Donation:", error);
            alert("An error occurred. Please try again later.");
        }
        navigate("/home");
    };

    return (
        <>
            <div
                className="relative flex justify-end items-center h-screen bg-[#080710] bg-cover bg-center px-20"
                style={{ backgroundImage: "url('/donation_page.jpg')" }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="w-[50%]">
                    <div className="relative w-[65%] h-auto p-8 rounded-lg shadow-2xl backdrop-blur-md bg-white/10 border border-red-800">
                        <h3 className="text-green-500 text-3xl font-semibold text-center">
                            Total Donation
                        </h3>
                        <h3 className="text-green-500 text-3xl font-semibold text-center">
                            {totalDonation}
                        </h3>
                    </div>
                </div>
                <div className="relative w-[45%] h-auto p-8 rounded-lg shadow-2xl backdrop-blur-md bg-white/10 border border-red-800">
                    <h3 className="text-green-500 text-3xl font-semibold text-center">
                        Donate For Disaster
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
                                Event Date
                            </label>
                            <input
                                type="date"
                                className="w-full mt-2 p-3 bg-white/20 text-black rounded-md outline-none focus:ring-2 focus:ring-green-500 placeholder-black"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                            <label className="text-green-500 font-medium mt-4 block">Amount</label>
                            <input
                                type="number"
                                name="number"
                                placeholder="amount"
                                className="w-full mt-2 p-3 bg-white/20 text-black rounded-md outline-none focus:ring-2 focus:ring-green-500 placeholder-black"
                                value={amount}
                                onChange={handleAmountChange}
                            />

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
