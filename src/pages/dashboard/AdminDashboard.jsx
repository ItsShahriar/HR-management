import React from "react";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
const navItems = [
    { path: "/dashboard/", label: "Dashboard" },
     { path: "/dashboard/attendance", label: "Attendance" },
   
    { path: "profile", label: "User profile" },   
     { path: "allEmployee", label: "Employee" },

    { path: "/dashboard/allleave", label: "Leave" },
    { path: "/dashboard/birthday", label: "Birthday" },
    { path: "allpayments", label: "Payments" },
  ];

const AdminDashboard = () => {
  
  return (
    <div className="space-y-5 bg-white p-8 md:h-screen flex flex-col justify-between">
      <div>
      <div className="nav__logo">
  <Link to="/">
    ORCID <span className="text-orange-500">HRM</span> {/* Orange text */}
  </Link>
  <p className="text-xs italic text-black">User Dashboard</p> {/* Orange text */}
</div>
        <hr className="mt-5" />
        <ul className="space-y-5 pt-5">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-bold" : "text-black"
                }
                end
                to={item.path}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <ToastContainer />
      </div>
      
    </div>
  );
};
export default AdminDashboard;