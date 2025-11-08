import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const {register, handleSubmit,  formState: { errors },} = useForm();
   
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

  const onSubmit = async(data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    try {
    
      const res = await axios.post("http://localhost:3000/user/login", userInfo,{ withCredentials: true });
      if (res.data) {
        toast.success("Login Successfully !!");
        navigate(from ,{replace:true});
        document.getElementById("my_modal_3").close();
        setTimeout(()=>{
          window.location.reload();
          localStorage.setItem("Users",JSON.stringify(res.data.user));
        },2000);
      }
    } catch (err) {
      if (err.response) {
        console.log(err);
        toast.error("Error : " + err.response.data.message); 
        setTimeout(()=>{},1000);
      } 
    }
  };

  return (
    <>
      <div>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box bg-white text-black dark:bg-slate-800 dark:text-white h-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
            <Link
            to="/"
             onClick={() => document.getElementById("my_modal_3").close()}
             className="btn btn-sm btn-circle btn-ghost absolute right-2 top-3 dark:hover:border-white dark:bg-slate-800 dark:text-white 
             light:hover:border-black light:bg-white light:text-black"
            >
                ✕
              </Link>

              <h3 className="font-bold text-2xl">User Login</h3>

              <div className="mt-8 grid space-y-2">
                <span className="text-xl space-y-3">Email:</span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-80 h-10  dark:bg-black dark:text-white rounded-sm border px-3"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>

              <div className="mt-8 grid space-y-2">
                <span className="text-xl space-y-3">Password:</span>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-80 h-10 dark:bg-black dark:text-white  rounded-sm border px-3"
                  {...register("password", { required: "Password is required" })}
                />
                {errors.password && (
                  <span className="text-red-500">{errors.password.message}</span>
                )}
              </div>

              {/* button */}
              <div className="flex mt-8 py-1 justify-between">
                <button
                  type="submit"
                  className="bg-pink-400 dark:bg-pink-600 dark:hover:bg-pink-700 text-white ml-1 px-3 py-1 rounded-md"
                >
                  Login
                </button>
                <p>
                  Not registered?
                  <Link
                    to="/signup"
                    className="underline text-blue-700 cursor-pointer"
                  >
                    Signup
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </>
  );
}

export default Login;
