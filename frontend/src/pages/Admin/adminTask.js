import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);

    // Fetch tasks from the backend
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/task/get_tasks", { //getting the tasks from db
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (res.ok) {
                    const data = await res.json();
                    console.log("Fetched tasks:", data);
                    setTasks(data.tasks || []);
                } else {
                    console.error("Failed to fetch tasks");
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
    }, []);

    return (
        <div className="h-auto bg-cover bg-center bg-green-600">
            <div className="fixed inset-0 bg-black bg-opacity-40 pointer-events-none"></div>
            <div className="sticky top-0 bg-[#263526] p-4 flex justify-between items-center z-10 shadow-lg bg-opacity-70 shadow-md">
                <h1 className="text-3xl font-bold text-gray-200">
                    Volunteer<span className="text-lime-500">Tasks</span>
                </h1>
            </div>

            <div className="z-40 p-6 space-y-6">
                <h2 className="text-center text-4xl font-bold text-white mb-4">Task Assignments</h2>

                {tasks.length > 0 ? (
                    tasks.map((task, index) => (
                        <div
                            key={task.task_id}
                            className="w-[70%] m-auto flex items-center justify-between bg-gray-100 p-5 rounded-lg shadow-sm hover:bg-gray-200 transition-all"
                        >
                            <span className="font-bold text-lg text-gray-800 w-8">
                                {index + 1}.
                            </span>
                            <span className="text-lg font-semibold flex-1">
                                {task.task_details}
                            </span>
                            <button
                                onClick={() =>
                                    navigate("/admin/task_assign", { //takes to the assigning page
                                        state: { task_id: task.task_id }, // state will passed for reference
                                    })
                                }
                                className="bg-lime-600 text-white py-1 px-4 rounded-md font-semibold "
                            >
                                Assign
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-700 font-semibold">No tasks found.</p>
                )}
            </div>
        </div>
    );
};

export default TaskList;
