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
    const result = await pool.query("select * from crisis where approval = true",);
    return result.rows;
}


module.exports = {
    createCrisis,
    getCrisis,
};
