import React, { useState,useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { getBaseUrl } from '../utils/baseURL';
const Bank = () => {
  const [formData, setFormData] = useState({
    employee: '',
    name: '',
    branch: '',
    account: '',
    salary: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [employees, setemploye] = useState([]);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add logic for submitting data to an API or server here
    setError(null);
    // Show loading indicator
    setLoading(true);
    try {
      const response = await axios.post(`${getBaseUrl()}/api/BankAccountCreate/create`, formData);
      console.log('bank added successful:', response.data);
      toast("bank added!");
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
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* CSRF Token */}
          <input
            type="hidden"
            name="csrfmiddlewaretoken"
            value="Mu9DbmR9G4q5f0Vf22q0E0FB7jlAfTQpyJqAzo7FTXbeIBw917pPj7Nn0nottN32"
          />

          {/* Employee Select */}
          <div className="form-group">
            <label htmlFor="employee" className="block text-sm font-semibold">
              Employee<span className="text-red-500">*</span>
            </label>
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
            <small className="text-gray-500 mt-1 block">Select employee(s) to add bank account</small>
          </div>

          {/* Bank Name Input */}
          <div className="form-group">
            <label htmlFor="name" className="block text-sm font-semibold">
              Name of Bank<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-control mt-1 p-2 rounded-lg w-full border"
            />
          </div>

          {/* Branch Input */}
          <div className="form-group">
            <label htmlFor="branch" className="block text-sm font-semibold">
              Branch
            </label>
            <input
              type="text"
              name="branch"
              id="branch"
              value={formData.branch}
              onChange={handleChange}
              className="form-control mt-1 p-2 rounded-lg w-full border"
            />
            <small className="text-gray-500 mt-1 block">Which branch was the account issued?</small>
          </div>

          {/* Account Number Input */}
          <div className="form-group">
            <label htmlFor="account" className="block text-sm font-semibold">
              Account Number<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="account"
              id="account"
              value={formData.account}
              onChange={handleChange}
              required
              className="form-control mt-1 p-2 rounded-lg w-full border"
            />
            <small className="text-gray-500 mt-1 block">Employee account number</small>
          </div>

          {/* Starting Salary Input */}
          <div className="form-group">
            <label htmlFor="salary" className="block text-sm font-semibold">
              Starting Salary<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="salary"
              id="salary"
              value={formData.salary}
              onChange={handleChange}
              step="0.01"
              required
              className="form-control mt-1 p-2 rounded-lg w-full border"
            />
            <small className="text-gray-500 mt-1 block">This is the initial salary of employee</small>
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

export default Bank;
