import React, { useState,useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { getBaseUrl } from "../../../utils/baseURL";
const ManageAttendence = () => {
    const [employe, setemploye] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        // Fetch employe from the API
        axios.get(`${getBaseUrl()}/api/attendancelist/`) // Example API
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
    <> <h3 className="text-center">Attendance Records</h3>
   <div className="container mx-auto p-6">
    <div className="row pb-4">
   <Link to="createattendance" className="btn btn-primary">Create Attendance</Link>
    </div>

      <table className="min-w-full text-center table-auto bg-white border border-gray-200 shadow-lg">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-2 border-b">Employee</th>
            <th className="px-4 py-2 border-b">Date</th>
            <th className="px-4 py-2 border-b">Check-in</th>
            <th className="px-4 py-2 border-b">Check-out</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody className="p-2">
          {employe.map((entry) => (
            <tr key={entry.id} className="hover:bg-gray-100">
              <td className="px-4 py-2 border-b">{entry.employee.firstname}{entry.employee.lastname}</td>
              <td className="px-4 py-2 border-b">{entry.date}</td>
              <td className="px-4 py-2 border-b">{entry.check_in}</td>
              <td className="px-4 py-2 border-b">{entry.check_out}</td>
              <td className="px-4 py-2 border-b">
                
                <Link to={`/dashboard/attendance/${entry.id}`}>
                            Edit
                          </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default ManageAttendence;