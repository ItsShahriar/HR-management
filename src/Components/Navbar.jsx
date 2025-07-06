import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";


import { useLogoutUserMutation } from "../redux/features/authRoutes/authRoutesApi";
import { logout } from "../redux/features/authRoutes/authRoutesSlice";
import avatarImg from "../assets/avatar.png";

const Navbar = () => {
 

  //show user if logged in
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const navigate = useNavigate();


  //dropdown menus
  const [isDropdownOpen, setisDropdownOpen] = useState(false);
  const handleDropdownToggle = () => {
    setisDropdownOpen(!isDropdownOpen);
  };
  const [isDropdownOpen1, setisDropdownOpen1] = useState(false);
  const handleDropdownToggleusers = () => {
    setisDropdownOpen1(!isDropdownOpen1);
  };

  const [isDropdownOpen2, setisDropdownOpen2] = useState(false);
  const handleDropdownToggleleave = () => {
    setisDropdownOpen2(!isDropdownOpen2);
  };
  const [isDropdownOpen3, setisDropdownOpen3] = useState(false);
  const handleDropdownToggleemploye = () => {
    setisDropdownOpen3(!isDropdownOpen3);
  };
  const adminDropdownMenus = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Profile", path: "/dashboard/profile" },
  
    { label: "change password", path: "/dashboard/add-product" },
  ];
  const userDropdownMenus1 = [
    { label: "createusers", path: "register" },
    { label: "all users", path: "allusers" },
    
  ];
  const EmployeMenus1 = [
    { label: "Add Employee", path: "add-employee" },
    { label: "all Employee", path: "allEmployee" },
    { label: "Emergency", path: "emergency" },
    { label: "Family", path: "family" },
    { label: "Bank account", path: "bank" },
    { label: "Deleted Employes", path: "deletedEmployee" },
  ];
  const LeaveMenus1 = [
    { label: "Pending leaves", path: "allleave" },
    { label: "Aproved leaves", path: "approvedleave" },
    { label: "Canceled leaves", path: "Canceledleave" },
    { label: "Rejected leaves", path: "rejectedleave" },
    { label: "Apply for leaves", path: "leave" },
   
  ];
  const userDropdownMenus = [
   
    { label: "Profile", path: "/dashboard/profile" },
  
    { label: "change password", path: "/dashboard/add-product" },
  
  ];

  const dropdownMenus =
    user?.role === "admin" ? [...adminDropdownMenus] : [...userDropdownMenus];

  const handleLogout = async () => {
    try {
      dispatch(logout());
      localStorage.removeItem("user");
      
      navigate("/");
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };
  return (
    <header className="fixed-nav-bar w-nav">
      <nav className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center">
        <ul className="nav__links">
    


             
          
          <li className="link">
          <button  onClick={handleDropdownToggleleave}>Leave</button>
            {isDropdownOpen2 && (
                  <div className="fixed  mt-3 p-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <ul className="font-medium space-y-2 p-2">
                      {LeaveMenus1.map((menu, index) => (
                        <li key={index}>
                          <Link
                            onClick={() => setisDropdownOpen2(false)}
                            className="dropdown-items"
                            to={menu.path}
                          >
                            {menu.label}
                          </Link>
                        </li>
                      ))}
                     
                    </ul>
                  </div>
                )}
          </li>
          <li className="link">
          <button  onClick={handleDropdownToggleemploye}>Employee</button>
            {isDropdownOpen3 && (
                  <div className="fixed  mt-3 p-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <ul className="font-medium space-y-2 p-2">
                      {EmployeMenus1.map((menu, index) => (
                        <li key={index}>
                          <Link
                            onClick={() => setisDropdownOpen3(false)}
                            className="dropdown-items"
                            to={menu.path}
                          >
                            {menu.label}
                          </Link>
                        </li>
                      ))}
                      
                    </ul>
                  </div>
                )}
          </li>
          <li className="link">
          <button  onClick={handleDropdownToggleusers}>Users</button>
            {isDropdownOpen1 && (
                  <div className="fixed  mt-3 p-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <ul className="font-medium space-y-2 p-2">
                      {userDropdownMenus1.map((menu, index) => (
                        <li key={index}>
                          <Link
                            onClick={() => setisDropdownOpen1(false)}
                            className="dropdown-items"
                            to={menu.path}
                          >
                            {menu.label}
                          </Link>
                        </li>
                      ))}
                      
                    </ul>
                  </div>
                )}
          </li>
        </ul>
       

        <div className="nav__icons relative">
         
        
          <span>
            {user && user ? (
              <>
             
             <img
                  onClick={handleDropdownToggle}
                  src={user?.profileImage || avatarImg}
                  alt=""
                  className="w-9 rounded-full cursor-pointer"
                />

{isDropdownOpen && (
                  <div className="absolute right-0 mt-3 p-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <ul className="font-medium space-y-2 p-2">
                      {dropdownMenus.map((menu, index) => (
                        <li key={index}>
                          <Link
                            onClick={() => setisDropdownOpen(false)}
                            className="dropdown-items"
                            to={menu.path}
                          >
                            {menu.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link onClick={handleLogout} className="dropdown-items">
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <i className="ri-user-line"></i>login
              </Link>
            )}
          </span>
        </div>
      </nav>

     
    </header>
  );
};

export default Navbar;