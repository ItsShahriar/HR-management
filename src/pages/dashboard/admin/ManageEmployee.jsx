import React, { useState,useEffect } from "react";
import axios from "axios";
import { getBaseUrl } from "../../../utils/baseURL";
import { Link } from "react-router-dom";

const ManageEmployee = () => {
    const [employ, setemploye] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        // Fetch employe from the API
        axios.get(`${getBaseUrl()}/api/employeelist/`) // Example API
            .then(response => {
                setemploye(response.data);
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

    const employeeCount = 5;
    const departmentCount = 1;
    const blockedUsersCount = 0;


    
  return (
    <>
    
      <section className="py-1 bg-blueGray-50">
      <section className="mb-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    {/* Employees Box */}
                    <section className="w-full sm:w-1/2 lg:w-1/3 p-2">
                        <div className="bg-blue-100 rounded-lg shadow-md p-4 flex justify-between items-center">
                            <a href="#" className="text-blue-600 text-lg font-semibold">Employees</a>
                            <span className="text-2xl font-bold text-blue-600">{employeeCount}</span>
                        </div>
                    </section>

                    {/* Departments Box */}
                    <section className="w-full sm:w-1/2 lg:w-1/3 p-2">
                        <div className="bg-green-100 rounded-lg shadow-md p-4 flex justify-between items-center">
                            <a href="#" className="text-green-600 text-lg font-semibold">Departments</a>
                            <span className="text-2xl font-bold text-green-600">{departmentCount}</span>
                        </div>
                    </section>

                    {/* Blocked Users Box */}
                    <section className="w-full sm:w-1/2 lg:w-1/3 p-2">
                        <div className="bg-red-100 rounded-lg shadow-md p-4 flex justify-between items-center">
                            <a href="#" className="text-red-600 text-lg font-semibold">Blocked Users</a>
                            <span className="text-2xl font-bold text-red-600">{blockedUsersCount}</span>
                        </div>
                    </section>
                </div>
            </div>
        </section>
        <div className="overflow-x-auto">
      <table className="table-auto w-full text-sm text-left text-gray-500">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-4 py-2 border-b">#</th>
            <th className="px-4 py-2 border-b">Fullname</th>
            <th className="px-4 py-2 border-b">Role</th>
            <th className="px-4 py-2 border-b">Department</th>
            <th className="px-4 py-2 border-b">Status</th>
            <th className="px-4 py-2 border-b">salary</th>
            <th className="px-5 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employ.map((entry) => (
            <tr  className="bg-white border-b hover:bg-gray-50">
              <td className="px-4 py-2">{entry.id}</td>
              <td className="px-4 py-2">{entry.firstname}{entry.lastname}</td>
              <td className="px-4 py-2">{entry.role?.name}</td>
              <td className="px-4 py-2">{entry.department?.name}</td>
              <td className="px-4 py-2">{entry.is_blocked ? "inactive" :"active" } </td>
              <td className="px-4 py-2">{entry.salary}</td>
              <td className="px-4 py-2">
              <Link to={`/dashboard/allEmployee/${entry.id}`} className="px-2 py-2">
                           View
                          </Link>
                <Link to={`/dashboard/allEmployeeedit/${entry.id}`} >Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        
      </section>
    </>
  );
};

export default ManageEmployee;