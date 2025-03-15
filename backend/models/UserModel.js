const pool = require("../config/db");

async function createUser(fullName, email, hashedPassword) {
    const result = await pool.query(
        `INSERT INTO users (full_name, email, password) 
             VALUES ($1, $2, $3) RETURNING user_id, full_name, email`,
        [fullName, email, hashedPassword]
    );
    return result.rows[0];
}

async function findUserByEmail(email) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
}



module.exports = {
    createUser,
    findUserByEmail,
};
