import React, { useState,useEffect } from 'react';
import { toast } from "react-toastify";
import axios from 'axios';
import { getBaseUrl } from '../utils/baseURL';
const Register = () => {
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    // Reset error state
    
    if (formData.password !== formData.password2) {
      setError("Passwords do not match!");
      return;
    }
    setError(null);
    // Show loading indicator
    setLoading(true);
    try {
      const response = await axios.post(`${getBaseUrl()}/api/register/`, formData);
      console.log('Registration successful:', response.data);
      toast("user created successfully!");
      // Handle success (redirect, show success message, etc.)
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Error during registration:', err);
    } finally {
      setLoading(false);
    }
  


  };

  return (
    <section className="form-wrapper">
      {/* Display Messages */}
      <section className="row">
        <section className="col col-sm-8 offset-sm-2">
          {/* Display Form Errors */}
        </section>
      </section>

      {/* Form Title */}
      <section className="row">
        <section className="col-lg-12 col-md-12 col-sm-12 text-center">
          <h3 className="text-2xl font-semibold">Add User</h3>
          <p className="text-sm text-gray-600">
            A user must be created before adding as an employee to the system
          </p>
        </section>
      </section>

      {/* User Creation Form */}
      <section className="row">
        <section className="col-lg-12 col-md-12 col-sm-12">
          <form onSubmit={handleSubmit}>
            <input
              type="hidden"
              name="csrfmiddlewaretoken"
              value="J80FnzWeJhE7OoH9o1PJQFzRYvQkPYvQWHMJKaUCPTcf5T8Ka3Vvc5im9N5bEsw8"
            />

            {/* Username Field */}
            <div className="form-group mb-4">
              <label htmlFor="id_username" className="block text-sm font-medium text-gray-700">
                Username<span className="text-red-500">*</span>
              </label>
              <div>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  autoFocus
                  className="textinput form-control mt-2 p-2 border border-gray-300 rounded-md w-full"
                  required
                  value={formData.username}
                  onChange={handleChange}
                />
                <small className="text-muted text-sm mt-2 block">
                  Required. 150 characters or fewer. Letters, digits, and @/./+/-/_ only.
                </small>
              </div>
            </div>

            {/* Email Field */}
            <div className="form-group mb-4">
              <label htmlFor="id_email" className="block text-sm font-medium text-gray-700">
                Email<span className="text-red-500">*</span>
              </label>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  maxLength="320"
                  className="emailinput form-control mt-2 p-2 border border-gray-300 rounded-md w-full"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-group mb-4">
              <label htmlFor="id_password1" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div>
                <input
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  className="passwordinput form-control mt-2 p-2 border border-gray-300 rounded-md w-full"
                  value={formData.password}
                  onChange={handleChange}
                />
                <small className="text-muted text-sm mt-2 block">
                  <ul className="list-inside list-disc">
                    <li>Your password can’t be too similar to your other personal information.</li>
                    <li>Your password must contain at least 8 characters.</li>
                    <li>Your password can’t be a commonly used password.</li>
                    <li>Your password can’t be entirely numeric.</li>
                  </ul>
                </small>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="form-group mb-4">
              <label htmlFor="id_password2" className="block text-sm font-medium text-gray-700">
                Password confirmation
              </label>
              <div>
                <input
                  type="password"
                  name="password2"
                  autoComplete="new-password"
                  className="passwordinput form-control mt-2 p-2 border border-gray-300 rounded-md w-full"
                  value={formData.password2}
                  onChange={handleChange}
                />
                <small className="text-muted text-sm mt-2 block">
                  Enter the same password as before, for verification.
                </small>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="btn btn-primary btn-lg btn-block bg-blue-500 text-white p-3 rounded-md w-full hover:bg-blue-600"
            >
                {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </section>
      </section>
    </section>
  );
};

export default Register
