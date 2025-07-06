import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Register from "../Components/Register";
import Login from "../Components/Login";
import DashboardLayout from "../pages/dashboard/DashboardLayout";

import ManageEmployee  from "../pages/dashboard/admin/ManageEmployee";
import ManageAttendence from "../pages/dashboard/admin/ManageAttendence";
import Allusers from "../Components/Allusers";
import Emergency from "../Components/Emergency";
import Family from "../Components/Family";
import Bank from "../Components/Bank";
import AddEmployee from "../pages/dashboard/admin/addProduct/AddEmployee";
import LeaveRequestForm from "../Components/Leave";
import Allleave from "../Components/Allleave";
import Birthday from "../Components/Birthday";
import ProfileCard from "../Components/ProfileCard";
import RejectedLeaves from "../Components/RejectedLeaves";
import ApprovedLeaves from "../Components/ApprovedLeaves";
import CancelledLeaves from "../Components/CancelledLeaves";
import AttendanceForm from "../Components/AttendanceFormupdate";
import EmployeProfile from "../Components/EmployeProfile";
import DeletedEmployes from "../Components/DeletedEmployes";
import LeaveView from "../Components/LeaveView";
import EditEmployee from "../pages/dashboard/admin/Employeeedit";
import PaymentForm from "../Components/PaymentForm";
import AllPayments from "../Components/Allpayments";
import CreateAttendence from "../Components/Attendencecreate";
import Landing from "../pages/Landing";
const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/",
          element: <Landing/>,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/dashboard",
          element: (
      
             
              <DashboardLayout />
          
          ),
          children: [
        
      
            //admin routes (only accessible by admin Todo: include role fields)
           
            {
              path: "add-employee",
              element: (
           
                  <AddEmployee />
                
              ),
            },
            {
              path: "allEmployee",
              element: (
               
                  <ManageEmployee  />
              
              ),
            },
            {
              path: "deletedEmployee",
              element: (
               
                  <DeletedEmployes />
              
              ),
            },
            {
              path: "allEmployee/:id",
              element: (
               
                  <EmployeProfile/>
              
              ),
            },
            {
              path: "allEmployeeedit/:id",
              element: (
               
                  <EditEmployee/>
              
              ),
            },
            {
              path: "attendance",
              element: (
                
                  <ManageAttendence />
              
              ),
            },
            {
              path: "attendance/createattendance",
              element: (
                
                  <CreateAttendence />
              
              ),
            },
            {
              path: "attendance/:id",
              element: (
                
                  <AttendanceForm />
              
              ),
            },
            {
              path: "allusers",
              element: (
                
                  <Allusers />
              
              ),
            },
            {
              path: "register",
              element: <Register />,
    
            },
            {
              path: "emergency",
              element: <Emergency />,
    
            },
            {
              path: "family",
              element: <Family />,
    
            },
            {
              path: "bank",
              element: <Bank />,
    
            },
            {
              path: "leave",
              element: <LeaveRequestForm />,
    
            },
            {
              path: "leaves/:id",
              element: (
               
                  <LeaveView/>
              
              ),
            },
            {
              path: "rejectedleave",
              element: <RejectedLeaves/>,
    
            },
            {
              path: "approvedleave",
              element: <ApprovedLeaves/>,
    
            },
            {
              path: "Canceledleave",
              element: <CancelledLeaves/>,
    
            },
            {
              path: "allleave",
              element: <Allleave />,
    
            },
            {
              path: "birthday",
              element: <Birthday />,
    
            },
            {
              path: "profile",
              element: <ProfileCard />,
    
            },
           
            {
              path: "allpayments",
              element: <AllPayments />,
    
            }, {
              path: "allpayments/createpayments",
              element: <PaymentForm/>,
    
            },
            
          ],
        }
      ],
    },
  
  ]);
  
  export default router;