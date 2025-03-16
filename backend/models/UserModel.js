const pool = require("../config/db");

async function createUser(fullName, email, hashedPassword) {
    const result = await pool.query(
        `insert into users (full_name, email, password) 
             values ($1, $2, $3) returning user_id, full_name, email`,
        [fullName, email, hashedPassword]
    );
    return result.rows[0];
}

async function findUserByEmail(email) {
    const result = await pool.query("select * from users where email = $1", [email]);
    return result.rows[0];
}

async function createDonation(fullName, email, date, amount, userId) {
    const result = await pool.query(
        `insert into donation (full_name, email, date, amount, user_id) 
             values ($1, $2, $3, $4, $5) returning user_id, full_name, email`,
        [fullName, email, date, amount, userId]
    );
    return result.rows[0];
}

async function getTotalDonation() {
    const result = await pool.query(`select SUM(amount) as total_donation from donation`);
    return result.rows[0].total_donation;
}

async function getDateWiseDonation(date) {
    const result = await pool.query(`select SUM(amount) as total_donation_date from donation where date= $1`,[date]);
    return result.rows[0].total_donation_date;
}

module.exports = {
    createUser,
    findUserByEmail,
    createDonation,
    getTotalDonation,
    getDateWiseDonation,
};
