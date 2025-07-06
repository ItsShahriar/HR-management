import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { getBaseUrl } from '../utils/baseURL';
const LeaveRequestForm = () => {
    const [formData, setFormData] = useState({
        startDate: '',
        endDate: '',
        leaveType: 'sick',
        reason: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
        setError(null);
    // Show loading indicator
    setLoading(true);
    try {
      const response = await axios.post(`${getBaseUrl()}/api/BankAccountCreate/create`, formData);
      console.log('leave added successful:', response.data);
      toast("leave added!");
      // Handle success (redirect, show success message, etc.)
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Error during registration:', err);
    } finally {
      setLoading(false);
    }
    };

    return (
        <section className="w-full px-4 py-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-group">
                    <label htmlFor="startdate" className="block text-lg font-medium text-gray-700">
                        Start Date<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        name="startDate"
                        id="startdate"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                    />
                    <small className="text-sm text-gray-500">Leave start date is on ...</small>
                </div>

                <div className="form-group">
                    <label htmlFor="enddate" className="block text-lg font-medium text-gray-700">
                        End Date<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        name="endDate"
                        id="enddate"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                    />
                    <small className="text-sm text-gray-500">Coming back on ...</small>
                </div>

                <div className="form-group">
                    <label htmlFor="leavetype" className="block text-lg font-medium text-gray-700">
                        Leave Type<span className="text-red-500">*</span>
                    </label>
                    <select
                        name="leaveType"
                        id="leavetype"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        value={formData.leaveType}
                        onChange={handleChange}
                        required
                    >
                        <option value="sick">Sick Leave</option>
                        <option value="casual">Casual Leave</option>
                        <option value="emergency">Emergency Leave</option>
                        <option value="study">Study Leave</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="reason" className="block text-lg font-medium text-gray-700">
                        Reason
                    </label>
                    <textarea
                        name="reason"
                        id="reason"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        rows="4"
                        value={formData.reason}
                        onChange={handleChange}
                    ></textarea>
                </div>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                >
                     {loading ? 'loading...' : 'Submit'}
                </button>
            </form>
        </section>
    );
};

export default LeaveRequestForm;
