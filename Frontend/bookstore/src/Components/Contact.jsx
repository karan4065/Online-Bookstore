import React from "react";
import photo from '../../public/Karanimage.jpg'
import {useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Footer from "./Footer";


const Contact = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const { register, handleSubmit } = useForm();


const onSubmit = async (data) => {
  const contactInfo = {
    name: data.name,
    email: data.email,
    message: data.message,
  };
  try {
    const res = await axios.post("https://online-bookstore-lzfa.onrender.com/contact/connect", contactInfo);
    if (res.data) {
      toast.success("Thank you! For Your Valuable Feedback.");
      navigate(from ,{replace:true});
    }
    localStorage.setItem("Contact",JSON.stringify(res.data.user));
  } catch (err) {
    if (err.response) {
      console.log(err);
      toast.success(" You are already a part of my network"); 
      navigate(from,{replace:true});
    } else {
      alert("An unexpected error occurred!");
    }
  }
};

  return (
       <div>
        <div className="min-h-screen flex items-center justify-center p-6 bg-white dark:bg-slate-900 dark:text-white">
  <div className="bg-white dark:bg-slate-900 dark:text-white w-full">
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">
        
        {/*Left side Image and Name */}
        <div className="w-80 mt-10 md:mt-0 h-auto text-center md:text-left">
        <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }} 
        className=" "
      >
          {/* photo */}
          <div className="flex justify-center md:justify-start">
            <img
              src={photo}
              alt="Karan Jadhav"
              className="h-64 w-64 object-cover rounded-md mt-8 shadow-lg "
            />
          </div>
          {/* Name */}
          <h2 className="text-3xl font-semibold mt-10 text-gray-900 dark:text-white dark:hover:text-emerald-500 transition-all active:scale-95 cursor-pointer">Karan Jadhav</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 dark:hover:text-red-500">Full-Stack Developer</p>
          </motion.div>
        </div>

        {/* Right side Form */}
        <div className="w-full md:w-[55%]">
          <motion.div
          initial={{opacity:0,x:20}}
          animate={{opacity:1,x:0}}
          transition={{duration:0.8}}
          > 
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            
            {/* Name */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mt-6 dark:text-gray-300">Name</label>
              <input
                type="text"
                className="w-full p-4 mt-2 border text-black border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your Name"
                {...register("name")}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                className="w-full p-4 mt-2 border text-black border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your Email"
                {...register("email")}
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">Message</label>
              <textarea
                className="w-full p-4 mt-2 text-black border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="2"
                placeholder="Your Message"
                {...register("message")}
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full dark:bg-blue-500 text-white py-3 rounded-lg 
              bg-pink-500 hover:bg-pink-600  dark:hover:bg-teal-600 transition duration-300"
            >
              Send Message
            </button>
          </form>
          </motion.div>
        </div>
      </div>

      <div className="text-center mt-6">
        <p className="text-xl text-gray-600 dark:text-gray-300 ">Or connect with me:</p>
      </div>
      <div className="mb-4 flex justify-center ">
         <Footer/>
      </div>
    </div>
  </div>
</div>
</div> 

  );
};

export default Contact;
