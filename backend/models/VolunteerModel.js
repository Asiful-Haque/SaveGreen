const pool = require("../config/db");

async function getVolunteers() {
    const result = await pool.query("select * from volunteer");
    return result.rows;
}

module.exports = {
    getVolunteers
};
