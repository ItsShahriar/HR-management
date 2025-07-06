import React, { useState,useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { getBaseUrl } from '../utils/baseURL';
const Emergency = () => {
  const [formData, setFormData] = useState({
    employee: '',
    fullname: '',
    tel: '',
    location: '',
    relationship: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [employee, setEmployeeId] = useState();
  const [employees, setemploye] = useState([]);
  useEffect(() => {
    // Fetch employe from the API
    axios.get(`${getBaseUrl()}/api/employeelist/`) // Example API
        .then(response => {
          setEmployeeId(response.data.id);
          setemploye(response.data);
            setLoading(false);
        })
        .catch(error => {
            setError(error.message);
            setLoading(false);
        });
}, []);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Emergency submitted:', formData);
    // You can perform further actions like sending data to an API here
    setError(null);
    // Show loading indicator
    setLoading(true);
    try {
      const response = await axios.post(`${getBaseUrl()}/api/EmergencyCreate/create`, formData);
      console.log('employee added successful:', response.data);
      toast("emergency added!");
      // Handle success (redirect, show success message, etc.)
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Error during registration:', err);
    } finally {
      setLoading(false);
    }
  

  };

  return (
    <section className="row">
      <section className="col-lg-12 col-md-12 col-sm-12">
        <form onSubmit={handleSubmit} className="space-y-4">
        

          {/* Employee Select */}
          <div className="form-group">
            <label htmlFor="employee" className="block text-sm font-semibold">
              Employee
            </label>
            <div>
            <select
            className="w-full p-2 border rounded"
            value={formData.employee}
              name="employee"
              id="employee"
            onChange={handleChange}
            required
          >
            <option value="">Select Employee</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.firstname} {employee.lastname} 
              </option>
            ))  }
          </select>
            </div>
          </div>

          {/* Fullname Input */}
          <div className="form-group">
            <label htmlFor="fullname" className="block text-sm font-semibold">
              Fullname<span className="text-red-500">*</span>
            </label>
            <div>
              <input
                type="text"
                name="fullname"
                id="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className="form-control mt-1 p-2 rounded-lg w-full border"
                required
              />
              <small className="text-gray-500 mt-1 block">Who should we contact?</small>
            </div>
          </div>

          {/* Phone Number Input */}
          <div className="form-group">
            <label htmlFor="tel" className="block text-sm font-semibold">
              Phone Number (Example +8801712345678)<span className="text-red-500">*</span>
            </label>
            <div>
              <input
                type="tel"
                name="tel"
                id="tel"
                value={formData.tel}
                onChange={handleChange}
                className="form-control mt-1 p-2 rounded-lg w-full border"
                required
              />
              <small className="text-gray-500 mt-1 block">
                Enter number with Country Code Eg. +8801712345678
              </small>
            </div>
          </div>

          {/* Location Input */}
          <div className="form-group">
            <label htmlFor="location" className="block text-sm font-semibold">
              Place of Residence<span className="text-red-500">*</span>
            </label>
            <div>
              <input
                type="text"
                name="location"
                id="location"
                value={formData.location}
                onChange={handleChange}
                className="form-control mt-1 p-2 rounded-lg w-full border"
                required
              />
            </div>
          </div>

          {/* Relationship Select */}
          <div className="form-group">
            <label htmlFor="relationship" className="block text-sm font-semibold">
              Relationship with Person<span className="text-red-500">*</span>
            </label>
            <div>
              <select
                name="relationship"
                id="relationship"
                className="form-control mt-1 p-2 rounded-lg w-full border"
                value={formData.relationship}
                onChange={handleChange}
                required
              >
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Sister">Sister</option>
                <option value="Brother">Brother</option>
                <option value="Uncle">Uncle</option>
                <option value="Aunty">Aunty</option>
                <option value="Husband">Husband</option>
                <option value="Wife">Wife</option>
                <option value="Fiance">Fiance</option>
                <option value="Cousin">Cousin</option>
                <option value="Fiancee">Fiancee</option>
                <option value="Niece">Niece</option>
                <option value="Nephew">Nephew</option>
                <option value="Son">Son</option>
                <option value="Daughter">Daughter</option>
              </select>
              <small className="text-gray-500 mt-1 block">Who is this person to you?</small>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary btn-lg btn-block mt-4 p-3 bg-blue-500 text-white rounded-lg w-full hover:bg-blue-600"
          >
            {loading ? 'loading...' : 'Submit'}
          </button>
        </form>
      </section>
    </section>
  );
};

export default Emergency;
