const pool = require("../config/db");

async function createCrisis(crisisName, crisisDetails, severity, status) {
    const result = await pool.query(
        `insert into crisis (crisis_name, crisis_details, severity, status) 
             values ($1, $2, $3, $4) returning crisis_name, crisis_details`,
        [crisisName, crisisDetails, severity, status]
    );
    return result.rows[0];
}

async function getCrisis() {
    const result = await pool.query("select * from crisis");
    return result.rows;
}

async function approveCrisisInDb(crisis_id) {
    const result = await pool.query(
        "UPDATE crisis SET approval = true WHERE crisis_id = $1 RETURNING *",
        [crisis_id]
    );
    return result.rows[0]; // Return the updated crisis
}

async function assignVolunteersToCrisisInDb(volunteerIds, crisisId) {
        const result = await pool.query(
            `INSERT INTO assigned_crisis (crisis_id, volunteer_id) 
             SELECT $1, unnest($2::int[]) 
             ON CONFLICT (crisis_id, volunteer_id) DO NOTHING
             RETURNING crisis_id, volunteer_id`,
            [crisisId, volunteerIds]
        );
        return result.rows;
}


module.exports = {
    createCrisis,
    getCrisis,
    approveCrisisInDb,
    assignVolunteersToCrisisInDb,
};
