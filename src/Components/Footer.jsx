import React, { useState,useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { getBaseUrl } from "../utils/baseURL";
const Footer = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [employees, setemploye] = useState([]);
  const [birthday, setbirthday] = useState([]);
  const [leave, setleave] = useState([]);
  console.log(employees)
  console.log(leave)
  useEffect(() => {
    // Fetch employe from the API
    axios.get(`${getBaseUrl()}/api/leaveAll//count/`) // Example API
        .then(response => {
          setleave(response.data);
            setLoading(false);
        })
        .catch(error => {
            setError(error.message);
            setLoading(false);
        });

        axios.get(`${getBaseUrl()}/api/employeelist/count/`) // Example API
        .then(response => {
          setemploye(response.data);
            setLoading(false);
        })
        .catch(error => {
            setError(error.message);
            setLoading(false);
        });
        axios.get(`${getBaseUrl()}/api/birthdays/`) // Example API
        .then(response => {
          setbirthday(response.data);
            setLoading(false);
        })
        .catch(error => {
            setError(error.message);
            setLoading(false);
        });
}, []);


  return (
    <>
    <div className="flex flex-wrap justify-around p-6 bg-gray-100">
      {/* Employee Section */}
      <div className="sec-box employee-box bg-white shadow-md rounded-lg p-4 w-60 m-2 flex flex-col items-center">
        <a href="#" className="text-xl font-semibold text-gray-800 hover:text-blue-500">
          <span>Employees</span>
        </a>
        <span className="count-object text-3xl font-bold text-gray-700">{employees.employee_count}</span>
      </div>

      {/* Leaves Section */}
      <div className="sec-box leave-box bg-white shadow-md rounded-lg p-4 w-60 m-2 flex flex-col items-center">
        <a href="#" className="text-xl font-semibold text-gray-800 hover:text-blue-500">
          <span>Leaves</span>
        </a>
        <span className="count-object text-3xl font-bold text-gray-700">{leave.AllLeave_count}</span>
      </div>

      {/* Birthdays Section */}
      <div className="sec-box birthday-box bg-white shadow-md rounded-lg p-4 w-60 m-2 flex flex-col items-center">
        <a href="#" className="text-xl font-semibold text-gray-800 hover:text-blue-500">
          <span>Birthdays</span>
        </a>
        <span className="count-object text-3xl font-bold text-gray-700">{birthday}</span>
      </div>
    </div>

      <div className="footer__bar">
        Copyright &copy; 2025 by Orcid. All rights reserved.
      </div>
    </>
  );
};

export default Footer;