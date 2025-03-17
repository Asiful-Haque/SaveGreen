import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signup");
    };

    const token = localStorage.getItem("token");
    let isAdmin = false;

    if (token) {
        try {
            const decoded = jwtDecode(token);
            if (decoded.email === "admin@gmail.com" && decoded.role === "admin") {
                isAdmin = true;
            }
        } catch (error) {
            console.error("Invalid Token", error);
        }
    }

    return (
        <div
            className="relative bg-cover bg-center h-auto flex justify-center"
            style={{ backgroundImage: "url(/preview.jpg)" }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <div className="absolute top-0 left-0 w-full bg-[#263526] flex justify-between shadow-md z-10 items-center px-6 py-4 bg-opacity-70">
                <h1 className="text-3xl font-bold text-gray-200">
                    Save<span className="text-lime-500">Green</span>
                </h1>

                <div className="flex space-x-6 items-center">
                    <div className="text-white hover:text-lime-500 transition-transform duration-200 hover:scale-110">
                        <a href="/donation">Donate</a>
                    </div>
                    <div className="text-white hover:text-lime-500  transition-transform duration-200 hover:scale-110">
                        <a href="/www.linkedin.com">Linkedin</a>
                    </div>
                    {isAdmin && (
                        <div className="text-white hover:text-lime-500  transition-transform duration-200 hover:scale-110">
                            <a href="/admin/report">Get Report</a>
                        </div>
                    )}
                    <div className="text-white hover:text-lime-500  transition-transform duration-200 hover:scale-110">
                        <a href="/www.github.com">Github</a>
                    </div>
                    {!isAdmin && (
                        <div className="text-white hover:text-lime-500  transition-transform duration-200 hover:scale-110">
                            <a href="/account">Profile</a>
                        </div>
                    )}

                    <button
                        onClick={handleLogout}
                        className="text-white hover:text-lime-500  transition-transform duration-200 hover:scale-110"
                    >
                        <Link to="/signup">Logout</Link>
                    </button>

                    <button onClick={() => {
                        if (!isAdmin) {
                            navigate("/account");
                        }
                    }}>
                        <img
                            src="https://i.pravatar.cc/50"
                            alt="User Avatar"
                            className="w-12 h-12 rounded-full border-2 border-lime-500"
                        />
                    </button>
                </div>
            </div>

            <div className="mb-8 flex flex-row justify-center items-center h-screen space-x-6 px-6">
                <div
                    onClick={() => {
                        try {
                            if (isAdmin) {
                                navigate("/admin/crisis");
                            } else {
                                navigate("/crisis");
                            }
                        } catch (error) {
                            console.error("Invalid token:", error);
                            navigate("/crisis");
                        }
                    }}
                    className="backdrop-blur-md bg-white/10 py-14 rounded-2xl shadow-xl hover:shadow-2xl cursor-pointer transition transform hover:scale-110 w-[250px]"
                >
                    <div className="flex items-center mb-4">
                        <div className="mx-auto flex flex-col items-center">
                            <i className="fas fa-skull-crossbones text-5xl text-green-500 mb-2"></i>
                            <h3 className="text-xl font-bold text-gray-900">Crisis</h3>
                        </div>
                    </div>
                </div>
                <div
                    onClick={() => {
                        navigate("/donation");
                    }}
                    className="backdrop-blur-md bg-white/10 py-14 rounded-2xl shadow-xl hover:shadow-2xl cursor-pointer transition transform hover:scale-110 w-[250px]"
                >
                    <div className="flex items-center mb-4">
                        <div className="mx-auto flex flex-col items-center">
                            <i className="fas fa-money-bill-alt text-5xl text-green-500 mb-2"></i>
                            <h3 className="text-xl font-bold text-gray-900">Fund</h3>
                        </div>
                    </div>
                </div>
                <div
                    onClick={() => {
                        try {
                            if (isAdmin) {
                                navigate("/admin/volunteer");
                            } else {
                                navigate("/volunteer");
                            }
                        } catch (error) {
                            console.error("Invalid token:", error);
                            navigate("/volunteer");
                        }
                    }}
                    className="backdrop-blur-md bg-white/10 py-14 rounded-2xl shadow-xl hover:shadow-2xl cursor-pointer transition transform hover:scale-110 w-[250px]"
                >
                    <div className="flex items-center mb-4">
                        <div className="mx-auto flex flex-col items-center">
                            <i className="fas fa-users text-5xl text-green-500 mb-2"></i>
                            <h3 className="text-xl font-bold text-gray-900">Volunteers</h3>
                        </div>
                    </div>
                </div>
                {isAdmin && ( //Only in admin this part will be shown
                    <div
                        onClick={() => {
                            navigate("/admin/task_list");
                        }}
                        className="backdrop-blur-md bg-white/10 py-14 rounded-2xl shadow-xl hover:shadow-2xl cursor-pointer transition transform hover:scale-110 w-[250px]"
                    >
                        <div className="flex items-center mb-4">
                            <div className="mx-auto flex flex-col items-center">
                                <i className="fas fa-rocket text-5xl text-green-500 mb-2"></i>
                                <h3 className="text-xl font-bold text-gray-900">Tasks</h3>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="absolute flex-center bottom-0 w-[90%] bg-green-700 shadow-lg rounded-t-3xl py-12">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div>
                        <h3 className="text-4xl font-bold text-black">70+</h3>
                        <p className="text-black font-semibold">Countries</p>
                        <p className="text-black">
                            More than 70 countries are connected with this platform.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold text-black">15000+</h3>
                        <p className="text-black font-semibold">Active Volunteers</p>
                        <p className="text-black">
                            Active 15k volunteers across the world are contributing.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold text-black">6000+</h3>
                        <p className="text-black font-semibold">Events</p>
                        <p className="text-black">
                            Events are successfully done by the active volunteers.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
