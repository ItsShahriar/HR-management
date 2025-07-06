import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { getBaseUrl } from '../utils/baseURL';
const AttendanceForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    check_in: '12:01', // default value
    check_out: '12:07',
    employee: id
     // default value
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you can send the data to the API or handle further actions
    console.log('Form data submitted:', formData);

    setError(null);
    // Show loading indicator
    setLoading(true);
    try {
      const response = await axios.put(`${getBaseUrl()}/api/attendanceupdate/update/${id}`, formData);
      console.log('updated attendence successful:', response.data);
      toast("updated attendence!");
      // Handle success (redirect, show success message, etc.)
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Error during registration:', err);
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="card shadow p-4 mt-3">
      <form onSubmit={handleSubmit}>
      
        {/* Check In Field */}
        <div className="mb-3">
          <label htmlFor="check_in" className="form-label text-sm font-semibold">Check In:</label>
          <input
            type="time"
            name="check_in"
            id="check_in"
            value={formData.check_in}
            onChange={handleChange}
            className="form-control w-full p-2 mt-1 border rounded-md"
          />
        </div>

        {/* Check Out Field */}
        <div className="mb-3">
          <label htmlFor="check_out" className="form-label text-sm font-semibold">Check Out:</label>
          <input
            type="time"
            name="check_out"
            id="check_out"
            value={formData.check_out}
            onChange={handleChange}
            className="form-control w-full p-2 mt-1 border rounded-md"
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {/* Buttons */}
        <div className="text-center">
          <button type="submit" className="btn btn-success btn-lg px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50">
            Save
          </button>
          <a href="/attendance/" className="btn btn-secondary btn-lg px-4 ml-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
};

export default AttendanceForm;
