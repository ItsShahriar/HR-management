import React from 'react';
import { useState,useEffect } from "react";
import axios from "axios";
import { getBaseUrl } from '../utils/baseURL';

const RejectedLeaves = () => {
  const [rejectedLeaves, setemploye] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
      // Fetch employe from the API
      axios.get(`${getBaseUrl()}/api/leaveAll/?status=rejected`) // Example API
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
    <div className="table-responsive table-shadow p-6 bg-gray-100 rounded-lg shadow-lg">
      {/* Table Title */}
      <div className="text-center table-description mb-4">
        <h4
          className="title-h3 text-xl font-semibold"
          style={{
            color: '#60a0b3',
            textShadow: '1px 0px rgba(0, 0, 0, 0.11)',
          }}
        >
          REJECTED LEAVES
        </h4>
      </div>

      {/* Total Rejected Leaves */}
      <section className="total-leaves-count mb-4">
        <p className="text-lg">
          Total rejected leaves - <span className="font-bold text-gray-800">1</span>
        </p>
      </section>

      {/* Table */}
      <table className="table w-full text-sm text-left">
        <thead>
          <tr className="bg-gray-200">
            <th scope="col" className="px-4 py-2 border-b">User</th>
            <th scope="col" className="px-4 py-2 border-b">Type</th>
            <th scope="col" className="px-4 py-2 border-b">Day(s)</th>
            <th scope="col" className="px-4 py-2 border-b">Status</th>
            <th scope="col" className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rejectedLeaves.map((leave, index) => (
            <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{leave.user}</td>
              <td className="px-4 py-2">{leave.leavetype}</td>
              <td className="px-4 py-2">{leave.startdate}-{leave.enddate}</td>
              <td className="px-4 py-2">{leave.status}</td>
              <td className="px-4 py-2 space-x-2">
              <a href={`/dashboard/leaves/${leave.id}`}>
                                    <span>view</span>
                                </a>
                <span>|</span>
                <a
                  href={leave.unrejectLink}
                  className="text-red-500 hover:text-red-700"
                >
                  Unreject
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RejectedLeaves;
