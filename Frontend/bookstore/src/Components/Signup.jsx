import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Login from "./Login";
import toast from "react-hot-toast";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Signup() { // this is signup api call 

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

  const {register,handleSubmit,formState: { errors },} = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };
    try {
      const res = await axios.post("http://localhost:3000/user/signup", userInfo);
      if (res.data) {
        toast.success("Signup Successfully Go to Login !!");
        navigate(from ,{replace:true});
      }
      localStorage.setItem("Users",JSON.stringify(res.data.user));
    } catch (err) {
      if (err.response) {
        console.log(err);
        toast.error("Error : " + err.response.data.message); 
      } else {
        alert("An unexpected error occurred!");
      }
    }
  };
  

  return (
    <>
    <Navbar/>
     <div className="w-full min-h-screen flex items-center justify-center bg-white dark:bg-slate-900 dark:text-white pt-10 md:pt-10">

  {/* Container */}
  <div className="flex flex-col border border-black dark:border-white md:flex-row w-[95%] max-w-5xl shadow-lg rounded-lg overflow-hidden bg-white dark:bg-slate-800">

    {/* Left Image Section */}
    <div className="hidden md:flex   w-1/2 bg-gray-200 dark:bg-black items-center justify-center">
      <img
        src="https://img.freepik.com/free-vector/user-verification-unauthorized-access-prevention-private-account-authentication-cyber-security-people-entering-login-password-safety-measures_335657-3530.jpg?semt=ais_hybrid&w=740&q=80"
        alt="Signup Visual"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Right Form Section */}
    <div className="w-full md:w-1/2 p-8 md:p-12 bg-white dark:bg-slate-900 dark:text-white">

      

      <h3 className="font-bold text-3xl mb-8">Signup</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Name */}
        <div>
          <label className="text-xl">Name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full h-12 mt-1 dark:bg-black dark:text-white rounded-md border px-4"
            {...register("fullname", { required: "Name is required" })}
          />
          {errors.fullname && (
            <p className="text-red-500 text-sm mt-1">{errors.fullname.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="text-xl">Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full h-12 mt-1 dark:bg-black dark:text-white rounded-md border px-4"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="text-xl">Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full h-12 mt-1 dark:bg-black dark:text-white rounded-md border px-4"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 dark:bg-pink-600 dark:hover:bg-pink-700 duration-300 text-white py-2 rounded-md"
          >
            Signup
          </button>

          <p className="text-center">
            Already Have an Account?{" "}
            <a
              className="underline text-blue-700 cursor-pointer"
              onClick={() => document.getElementById('my_modal_3').showModal()}
            >
              Login
            </a>
          </p>
        </div>

      </form>

      <Login />

    </div>
  </div>
</div>

       <div className="">
        <Footer/>
       </div>
    </>
  );
}

export default Signup;
