const { getDonationReportInDb } = require("../models/ReportModel");
const XLSX = require("xlsx"); 

const ReportController = {};

ReportController.getDonationReport = async (req, res) => {
    const date = new Date().toISOString().split("T")[0]; // Get today's date
    try {
        const donations = await getDonationReportInDb(date);

        if (donations.length > 0) {
            // Create an Excel file from db data
            const ws = XLSX.utils.json_to_sheet(donations); // Converting JSON to sheet
            const wb = XLSX.utils.book_new(); // Creating a new workbook
            XLSX.utils.book_append_sheet(wb, ws, "Donations"); // Append sheet to workbook

            // Convert the workbook to a buffer
            const fileBuffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });

            // Set headers to indicate the response is a file download
            res.setHeader(
                "Content-Disposition",
                `attachment; filename=donations_report_${date}.xlsx`
            );
            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );

            // Send the file buffer as the response
            res.send(fileBuffer);
        } else {
            res.status(404).json({ message: "No donations found for today" });
        }
    } catch (error) {
        console.error("Error fetching donation data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = ReportController;
