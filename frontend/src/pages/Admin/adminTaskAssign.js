import React from "react";
import { useLocation } from "react-router-dom";
import VolunteerAssign from "../../components/VolunteerAssign";

const TaskAssign = () => {
    const location = useLocation();
    const { task_id } = location.state || {}; // Extract crisis_id from state

    if (!task_id) {
        return <p className="text-center text-red-600 font-semibold">Task ID not found.</p>;
    }

    return <VolunteerAssign task_id={task_id} />;
};

export default TaskAssign;
