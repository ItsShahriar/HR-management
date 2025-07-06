import React, { useState,useEffect } from "react";
import axios from "axios";
import { getBaseUrl } from "../utils/baseURL";

const PaymentForm = () => {
  const [employeeId, setEmployeeId] = useState();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const [employees, setemploye] = useState([]);

  const [error, setError] = useState(null);
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



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post(
        `${getBaseUrl()}/api/initiate-salary-payment/`,
        {
          employee_id: employeeId,
          amount: amount,
        }
      );
      
      window.location.href = response.data.payment_url;
      console.log(response.data.payment_url)
    } catch (error) {
      console.error('Payment initiation failed:', error);
      alert('Payment failed to initiate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Employee Payment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Employee</label>
          <select
            className="w-full p-2 border rounded"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
          >
            <option value="">Select Employee</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.firstname} {employee.lastname} - BDT {employee.salary}
              </option>
            ))  }
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Amount</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Make Payment'}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;