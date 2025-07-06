import React, { useState,useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { getBaseUrl } from "../utils/baseURL";
const DeletedEmployes = () => {
    const [employees, setemploye] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        // Fetch employe from the API
        axios.get(`${getBaseUrl()}/api/employeelist/?is_deleted=true`) // Example API
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
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees ? employees.map((employee, index) => (
            <tr key={index} className="bg-white border-b hover:bg-gray-50">
              <td className="px-4 py-2">{employee.id}</td>
              <td className="px-4 py-2">{employee.firstname}{employee.lastname}</td>
              <td className="px-4 py-2">{employee.role}</td>
              <td className="px-4 py-2">{employee.department}</td>
              <td className="px-4 py-2">{employee.is_blocked}{employee.is_deleted}</td>
              <td className="px-4 py-2">
              <Link to={`/dashboard/allEmployee/${employee.id}`}>
                           View
                          </Link>
                <a href={employee.editUrl} className="text-blue-600 hover:text-blue-800">edit</a>
              </td>
            </tr>
          )) :  (<p>no employe found</p>)}
        </tbody>
      </table>
    </div>
        
      </section>
    </>
  );
};

export default DeletedEmployes;