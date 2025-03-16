const pool = require("../config/db");

async function getVolunteers() {
    const result = await pool.query("select * from volunteer");
    return result.rows;
}


async function approveVolunteerInDb(volunteer_id) {
    
        const result = await pool.query(
            "UPDATE volunteer SET approved = true WHERE volunteer_id = $1 RETURNING *",
            [volunteer_id]
        );
        return result.rows[0]; // Return the updated volunteer
}

module.exports = {
    getVolunteers,
    approveVolunteerInDb,
};
