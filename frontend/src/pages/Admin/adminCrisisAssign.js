import React from "react";
import { useLocation } from "react-router-dom";
import VolunteerAssign from "../../components/VolunteerAssign";

const CrisisAssign = () => {
    const location = useLocation();
    const { crisis_id } = location.state || {}; // Extract crisis_id from state

    if (!crisis_id) {
        return <p className="text-center text-red-600 font-semibold">Crisis ID not found.</p>;
    }

    return <VolunteerAssign crisis_id={crisis_id} />;
};

export default CrisisAssign;
