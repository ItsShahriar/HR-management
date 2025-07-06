import React, { useState, useEffect } from "react";
import axios from "axios";
import { getBaseUrl } from "../utils/baseURL";

const CreateAttendence = () => {
  const [checkin, setCheckIn] = useState("");
  const [checkout, setCheckOut] = useState("");
  const [loading, setLoading] = useState(false);
  const [employee, setEmployeeId] = useState(""); // Store selected employee ID as a string (or number)
  const [employees, setEmployees] = useState([]); // Store the list of employees
  const [error, setError] = useState(null);

  // Fetch employees from the API
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${getBaseUrl()}/api/employeelist/`) // Example API
      .then((response) => {
        setEmployees(response.data); // Set the list of employees
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${getBaseUrl()}/api/attendancecreate/`, {
        employee: Number(employee), // Ensure employee ID is a number
        check_in: checkin,
        check_out: checkout,
      });
      console.log(response);
      window.location.href = "/dashboard/attendance";
    } catch (error) {
      console.error("Attendance adding failed:", error);
      alert("Attendance adding failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Create Attendance</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Employee</label>
          <select
            className="w-full p-2 border rounded"
            value={employee}
            onChange={(e) => setEmployeeId(e.target.value)} // Store the selected employee ID
            required
          >
            <option value="">Select Employee</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.firstname} {employee.lastname}
              </option>
            ))}
          </select>
        </div>

        {/* Check In Field */}
        <div className="mb-3">
          <label htmlFor="check_in" className="form-label text-sm font-semibold">
            Check In:
          </label>
          <input
            type="time"
            name="check_in"
            id="check_in"
            value={checkin}
            onChange={(e) => setCheckIn(e.target.value)}
            className="form-control w-full p-2 mt-1 border rounded-md"
          />
        </div>

        {/* Check Out Field */}
        <div className="mb-3">
          <label htmlFor="check_out" className="form-label text-sm font-semibold">
            Check Out:
          </label>
          <input
            type="time"
            name="check_out"
            id="check_out"
            value={checkout}
            onChange={(e) => setCheckOut(e.target.value)}
            className="form-control w-full p-2 mt-1 border rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreateAttendence;