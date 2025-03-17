import React from "react";

const DownloadReport = () => {
    const handleDownload = async () => {
        try {
            // Send request to backend to generate the report
            const response = await fetch("http://localhost:5000/api/report/get_report", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to generate the report");
            }

            // Convert the response to a Blob (Excel file)
            const blob = await response.blob();

            // Create a link to download the file
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `donations_report_${new Date().toISOString().split("T")[0]}.xlsx`; // Filename with today's date
            link.click();
        } catch (err) {
            console.error("Download error:", err);
        }
    };

    return (
        <div className="bg-cover bg-center bg-green-600 h-screen flex items-center justify-center">
            <button
                className="w-[40%] mt-6 bg-black text-green-500 p-3 text-lg font-semibold rounded-md"
                onClick={handleDownload}
            >
                Download Donation Report
            </button>
        </div>
    );
};

export default DownloadReport;
