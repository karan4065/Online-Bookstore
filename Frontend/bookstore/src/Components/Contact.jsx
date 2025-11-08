import React from "react";
import photo from '../../public/pass.jpg'
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Footer from "./Footer";

const Contact = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const contactInfo = {
      name: data.name,
      email: data.email,
      message: data.message,
    };

    try {
      const res = await axios.post("http://localhost:3000/contact/connect", contactInfo);
      if (res.data) {
        toast.success("Thank you! For Your Valuable Feedback.");
        navigate(from, { replace: true });
      }
      localStorage.setItem("Contact", JSON.stringify(res.data.user));
    } catch (err) {
      if (err.response) {
        toast.success("You are already a part of my network"); 
        navigate(from, { replace: true });
      } else {
        alert("An unexpected error occurred!");
      }
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center pt-20 bg-white dark:bg-slate-900 dark:text-white">
        <div className="bg-white dark:bg-slate-900 dark:text-white w-full">
          <div className="max-w-6xl mx-auto px-2">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">

              {/* Left side */}
              <div className="w-80 mt-10 md:mt-0 h-auto text-center md:text-left">
                <motion.div 
                  initial={{ opacity: 0, y: -20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.8 }}
                >
                  <div className="flex justify-center md:justify-start">
                    <img
                      src={photo}
                      alt="Karan Jadhav"
                      className="h-64 w-64 object-cover rounded-md mt-8 shadow-lg"
                    />
                  </div>

                    <h2 className="text-3xl font-semibold mt-10 text-gray-900 dark:text-white  transition-all active:scale-95 cursor-pointer">Mr. Karan Jadhav</h2>
                  <p className="text-lg  text-gray-500 dark:text-gray-500">
                    Full-Stack Developer
                  </p>
                </motion.div>
              </div>

              {/* Right side: Form */}
              <div className="w-full md:w-[55%]">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

                    {/* Name */}
                    <div>
                      <label className="block text-lg font-medium mt-6">Name</label>
                      <input
                        type="text"
                        className="w-full p-4 mt-2 border text-black rounded-lg shadow-sm"
                        placeholder="Your Name"
                        {...register("name", { required: "Name is required" })}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-lg font-medium">Email</label>
                      <input
                        type="email"
                        className="w-full p-4 mt-2 border text-black rounded-lg shadow-sm"
                        placeholder="Your Email"
                        {...register("email", { required: "Email is required" })}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-lg font-medium">Message</label>
                      <textarea
                        className="w-full p-4 mt-2 border text-black rounded-lg shadow-sm"
                        rows="2"
                        placeholder="Your Message"
                        {...register("message", { required: "Message is required" })}
                      ></textarea>
                      {errors.message && (
                        <p className="text-red-500 text-sm">{errors.message.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full dark:bg-blue-500 text-white py-3 rounded-lg bg-pink-500 hover:bg-pink-600 dark:hover:bg-teal-600 transition duration-300"
                    >
                      Send Message
                    </button>
                  </form>
                </motion.div>
              </div>
            </div>

            <div className="text-center mt-6">
              <p className="text-xl text-gray-600 dark:text-gray-300">Or connect with me:</p>
            </div>

            <div className="flex justify-center">
              <Footer />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
