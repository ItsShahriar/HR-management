import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

const DashboardLayout = () => {
    const {user} = useSelector(state => state.auth);
    if(!user) {
        return <Navigate to="/login" replace/>
    }

    const footer = {
      
    }
  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-4 items-start justify-start">
     
      <header className="lg:w-1/5 sm:w-2/5 w-full border">
      <AdminDashboard />
      
      </header>
      <main className="p-8 bg-white w-full  mt-5">
         <Navbar/><Outlet />
       
      
            <Footer/>
      </main>
    </div>
  );
};
export default DashboardLayout;