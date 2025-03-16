import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DonationChart = () => {
    const [donationData, setDonationData] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().split("T")[0]);

    useEffect(() => {
        const fetchDonationData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/users/total_donation_date_wise"
                );
                const data = await response.json();

                console.log("Fetched donation data:", data);

                if (Array.isArray(data) && data.length > 0) {
                    setDonationData(data);
                } else {
                    setDonationData([{ date: currentDate, total_donation: 1 }]); // default to 1 for visibility
                }
            } catch (error) {
                console.error("Error fetching donation data:", error);
                setDonationData([{ date: currentDate, total_donation: 1 }]); // default test data
            }
        };

        fetchDonationData();

        const interval = setInterval(fetchDonationData, 5 * 60 * 1000); // for 5 minutes

        // fetch new data at midnight (when date changes)
        const timeout = setTimeout(() => {
            setCurrentDate(new Date().toISOString().split("T")[0]);
            fetchDonationData();
        }, getTimeToMidnight());

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [currentDate]);

    // Function to calculate time to midnight
    const getTimeToMidnight = () => {
        const now = new Date();
        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0);
        return midnight.getTime() - now.getTime();
    };

    // Extract donation values safely and ensure they are integers
    const formattedDonations = donationData.map((item) => parseInt(item.total_donation || 0, 10));

    // Ensure at least a minimum y-axis value of 1 if donations exist
    const maxDonation =
        formattedDonations.length > 0 ? Math.max(1, ...formattedDonations) : 1;

    // Prepare data for chart
    const chartData = {
        labels: donationData.map((item) => item.date || "Unknown Date"),
        datasets: [
            {
                label: "Total Donations",
                data: formattedDonations,
                backgroundColor: "#00FF00", 
                borderColor: "white", 
                borderWidth: 2,
                barThickness: 80, 
                minBarLength: 100, 
            },
        ],
    };

    // Chart options to control the y-axis range and step size
    const chartOptions = {
        responsive: true,
        scales: {
            y: {
                min: 0,
                max: maxDonation,
                ticks: {
                    stepSize: maxDonation / 6, // Adjust step size dynamically
                    color: "white", 
                },
                grid: {
                    color: "white", 
                },
            },
            x: {
                grid: {
                    display: false, 
                },
                ticks: {
                    color: "white", 
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    color: "yellow", 
                    font: {
                        size: 18,
                    },
                },
            },
        },
    };

    return (
        <div style={{ width: "70%", height: "400px" }}>
            <h2 style={{ color: "white" }}>Donation Data (Last 24 Hours)</h2>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};

export default DonationChart;
