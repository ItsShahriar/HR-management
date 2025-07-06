import React, { useState,useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { getBaseUrl } from "../utils/baseURL";

const LeaveView = () => {
  const [employees, setemploye] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  console.log(id)
  useEffect(() => {
    // Fetch employe from the API
    axios.get(`${getBaseUrl()}/api/leaveAll/${id}/`) // Example API
        .then(response => {
          setemploye(response.data);
            setLoading(false);
        })
        .catch(error => {
            setError(error.message);
            setLoading(false);
        });
}, [id]);

  return (
    <section className="flex flex-row">
      {/* Profile Picture */}
      <section className="lg:w-1/4 w-full text-center">
        <img
          src="/media/default.png"
          alt="Profile"
          className="w-32 h-32 mx-auto rounded-full object-cover"
        />
      </section>

      {/* Leave Information */}
      <section className="lg:w-3/4 w-full mt-4 lg:mt-0">
        <div className="list-group">
          <div className="list-group-item flex justify-between py-2 px-4 border-b">
            <span>Employee:</span>
            <div>{employees.user}</div>
          </div>
          <div className="list-group-item flex justify-between py-2 px-4 border-b">
            <span>Start Date:</span>
            <div>{employees.startdate}</div>
          </div>
          <div className="list-group-item flex justify-between py-2 px-4 border-b">
            <span>End Date:</span>
            <div>{employees.enddate}</div>
          </div>
          <div className="list-group-item flex justify-between py-2 px-4 border-b">
            <span>Duration:</span>
            <div>None days</div>
          </div>
          <div className="list-group-item flex justify-between py-2 px-4 border-b">
            <span>Type:</span>
            <div>{employees.leavetype}</div>
          </div>
          <div className="list-group-item flex justify-between py-2 px-4 border-b">
            <span>Reason:</span>
            <div>{employees.reason}</div>
          </div>
          <div className="list-group-item flex justify-between py-2 px-4 border-b">
            <span>Status:</span>
            <div>{employees.status}</div>
          </div>
        </div>
        <span className="text-sm text-gray-500 block mt-2">
          Created : {employees.created}
        </span>
      </section>
    </section>
  );
};

export default LeaveView;
