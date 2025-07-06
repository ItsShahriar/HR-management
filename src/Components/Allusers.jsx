import React, { useState,useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { getBaseUrl } from "../utils/baseURL";
const Allusers = () => {
    const [data, setemploye] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        // Fetch employe from the API
        axios.get(`${getBaseUrl()}/api/employeelist/`) // Example API
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
    <>
    
    <div className="overflow-x-auto p-4">
      <table className="min-w-full table-auto bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left">Username</th>
            <th className="px-4 py-2 border-b text-left">Employee (Full Name)</th>
            <th className="px-4 py-2 border-b text-left">Department</th>
            <th className="px-4 py-2 border-b text-left">Status</th>
            <th className="px-4 py-2 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="px-4 py-2 border-b">{row.firstname}</td>
              <td className="px-4 py-2 border-b">{row.firstname}{row.lastname}</td>
              <td className="px-4 py-2 border-b">{row.department?.name}</td>
              <td className="px-4 py-2 border-b">{row.user?.is_active==0 ? "inactive" : "Active" }</td>
              <td className="px-4 py-2">
              <Link to={`/dashboard/allEmployee/${row.id}`} className="px-2 py-2">
                           View
                          </Link>
                <Link to={`/dashboard/allEmployeeedit/${row.id}`} >Edit</Link>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default Allusers;