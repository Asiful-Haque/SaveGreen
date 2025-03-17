const pool = require("../config/db");

async function getDonationReportInDb(date) {
    const result = await pool.query(
        `select * from donation where date= $1`,
        [date]
    );
    return result.rows;
}

module.exports = {
    getDonationReportInDb,
};
