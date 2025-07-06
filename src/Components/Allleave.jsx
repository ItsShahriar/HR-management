import React, { useState,useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { getBaseUrl } from "../utils/baseURL";
const Allleave = () => {
   
    const [leaveRequests, setemploye] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        // Fetch employe from the API
        axios.get(`${getBaseUrl()}/api/leaveAll/`) // Example API
            .then(response => {
                setemploye(response.data);
                console.log(response.data)
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <div className="text-center py-4">
                <h4 className="text-2xl font-semibold text-[#60a0b3]" style={{ textShadow: '1px 0px rgba(0, 0, 0, 0.11)' }}>
                    ALL LEAVES
                </h4>
            </div>

            <table className="min-w-full table-auto border-collapse">
                <thead>
                    <tr className="border-b">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">User</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Type</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Day(s)</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {leaveRequests.map((leave) => (
                        <tr key={leave.id} className="border-b">
                            <td className="px-6 py-4 text-sm text-gray-800">{leave.user}</td>
                            <td className="px-6 py-4 text-sm text-gray-800">{leave.leavetype}</td>
                            <td className="px-6 py-4 text-sm text-gray-800">{leave.startdate}-{leave.enddate}</td>
                            <td className="px-6 py-4 text-sm text-gray-800">{leave.status}</td>
                            <td className="px-6 py-4 text-sm text-blue-600 hover:text-blue-800">
                                <a href={`/dashboard/leaves/${leave.id}`}>
                                    <span>view</span>
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Allleave;
