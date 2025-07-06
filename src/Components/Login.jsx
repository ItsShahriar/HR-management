import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../redux/features/authRoutes/authRoutesApi";
import { setUser } from "../redux/features/authRoutes/authRoutesSlice";

const Login = () => {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const [loginUser, {isLoading: loginLoading}] = useLoginUserMutation();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = {
        username,
        password
    }
        console.log
    try{
      const response = await loginUser(data).unwrap();
      console.log(response);
      const {access, user} = response;
      
      dispatch(setUser({user}));
      localStorage.setItem("user", JSON.stringify(access));
      alert("Login Successful");
      window.location.href = "/dashboard"
    } catch(error) {
      setMessage("Invalid email or password");
    }

  }

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="max-w-sm border shadow bg-white mx-auto p-8">
        <h2 className="text-2xl font-semibold pt-5">Please Login</h2>
        <form onSubmit={handleRegister} className="space-y-5 max-w-sm mx-auto pt-8">
          <input
            type="username"
            name="username"
            id="username"
            placeholder="Username Address"
            required
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
          />
          {message && <p className="text-red-500">{message}</p>}
          <button
            type="submit"
            className="w-full mt-5 bg-indigo-500 text-white hover:bg-indigo-500 font-medium py-3 rounded-md"
          >
            Login
          </button>

         
        </form>
      </div>
    </section>
  );
};

export default Login;