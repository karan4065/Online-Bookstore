// src/components/AdminLogin.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function AdminLogin() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/adminpage"; // default admin landing

  const onSubmit = async (data) => {
    const adminInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      // Adjust endpoint to your backend admin login route
      const res = await axios.post("http://localhost:3000/admin/login", adminInfo,{withCredentials:true});


      if (res.data && res.data.admin) {
         
        // Save admin information securely (only what you need)
        localStorage.setItem("Admin", JSON.stringify(res.data.admin));
        document.getElementById("admin_modal").close();
        // navigate to admin area
        navigate(from, { replace: true });
        // optionally reload if you rely on global state from storage
        setTimeout(() => window.location.reload(), 800);
      } else {
        // fallback message
        toast.error("Invalid admin response from server.");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error("Error: " + err.response.data.message);
      } else {
        toast.error("Network or server error. Try again.");
        console.error(err);
      }
    }
  };

  return (
    <>
      <dialog id="admin_modal" className="modal">
        <div className="modal-box bg-white text-black dark:bg-slate-800 dark:text-white h-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <button
              type="button"
              onClick={() => document.getElementById("admin_modal").close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-3 dark:hover:border-white dark:bg-slate-800 dark:text-white light:hover:border-black light:bg-white light:text-black"
            >
              ✕
            </button>

            <h3 className="font-bold text-2xl">Admin Login</h3>

            <div className="mt-8 grid space-y-2">
              <label className="text-xl">Email:</label>
              <input
                type="email"
                placeholder="Enter admin email"
                className="w-80 h-10 dark:bg-black dark:text-white rounded-sm border px-3"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Enter a valid email",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>

            <div className="mt-6 grid space-y-2">
              <label className="text-xl">Password:</label>
              <input
                type="password"
                placeholder="Enter admin password"
                className="w-80 h-10 dark:bg-black dark:text-white rounded-sm border px-3"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
              />
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </div>

            <div className="flex mt-8 py-1 justify-between items-center">
              <button
                type="submit"
                className="bg-pink-400 dark:bg-pink-600 dark:hover:bg-pink-700 text-white ml-1 px-3 py-1 rounded-md"
              >
                Admin Login
              </button>

              {/* No signup link for admin — single admin only */}
              <p className="text-sm text-gray-500">
                Only authorized admin can access this area.
                <br />
                <Link
                  to="/"
                  onClick={() => document.getElementById("admin_modal").close()}
                  className="underline text-blue-700"
                >
                  Back to store
                </Link>
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default AdminLogin;
