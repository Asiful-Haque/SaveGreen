const pool = require("../config/db");


async function getAllTaskInDb() {
    const result = await pool.query("select * from tasks");
    return result.rows;
}

async function assignVolunteersToTasksInDb(volunteerIds, taskId) {
    const result = await pool.query(
        `INSERT INTO assigned_task (task_id, volunteer_id) 
             SELECT $1, unnest($2::int[]) 
             ON CONFLICT (task_id, volunteer_id) DO NOTHING
             RETURNING task_id, volunteer_id`,
        [taskId, volunteerIds]
    );
    return result.rows;
}

module.exports = {
    getAllTaskInDb,
    assignVolunteersToTasksInDb,
};
