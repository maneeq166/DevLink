import React, { useState } from "react";
import { url } from "../config/be";
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  // const [success,setSuccess] = useState(); 

const submitForm = async (e) =>{

  e.preventDefault();
  try {    
  const res =  await axios.post(`${url}/auth/signin`,{
    password,email
  });

  if (res.data.success) {
        toast.success(res.data.message || "Signup successful!");
        localStorage.setItem("token",res.data.token)
        navigate("/profile");
      } else {
        console.log(res);        
        toast.error(res.data.message || "Signup failed.");}

  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "Signup Failed!" )
    
  }
  }





  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-900">
      <form onSubmit={submitForm} className="w-full max-w-md bg-gray-800 text-white rounded-xl shadow-lg p-8">
        <div className="flex justify-center mb-6">
          
        </div>
        <h2 className="text-3xl font-semibold text-center mb-8">Login</h2>

        <div className="mb-4">
          <label className="block text-sm mb-2">Email Address</label>
          <input
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-2">Password</label>
          <input
           value={password}
          onChange={(e)=>setPassword(e.target.value)}
            type="password"
            placeholder="********"
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-md text-white font-semibold transition-all duration-200"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-400 mt-6">
          Don’t have an account?{" "}
          <span onClick={()=>navigate("/signup")} className="text-blue-400 hover:underline cursor-pointer">
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
  }

export default Signin;
