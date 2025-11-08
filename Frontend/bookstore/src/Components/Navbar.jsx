import React, { useEffect, useState } from 'react';
import Login from './Login';
import { useAuth } from '../context/AuthProvider';
import Logout from './Logout';
import toast from 'react-hot-toast';
import { IoCartOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from "lucide-react";
import AdminLogin from '../pages/AdminLogin';

const Navbar = () => {
  const navigate = useNavigate();
  const [authUser] = useAuth();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const element = document.documentElement;

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark");
    }
  }, [theme]);

  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = (
    <>
      <li className="px-4 text-lg font-medium transition-colors">
        <Link className="text-black dark:text-white hover:text-slate-600 dark:hover:text-slate-400" to="/">Home</Link>
      </li>

      <li className="px-4 text-lg font-medium transition-colors">
        <Link
          className="text-black dark:text-white  hover:text-slate-600 dark:hover:text-slate-400"
          to="/course"
          onClick={(event) => {
            if (!authUser) {
              event.preventDefault();
              const toastId = toast.error("You must log in first to access the course section.");
              setTimeout(() => toast.dismiss(toastId), 3000);
            }
          }}
        >
          Books
        </Link>
      </li>

      <li className="px-4 text-lg font-medium transition-colors">
        <Link
          className="text-black dark:text-white  hover:text-slate-600 dark:hover:text-slate-400"
          to="/orders"
          onClick={(event) => {
            if (!authUser) {
              event.preventDefault();
              const toastId = toast.error("You must log in first to view orders.");
              setTimeout(() => toast.dismiss(toastId), 3000);
            }
          }}
        >
          Orders
        </Link>
      </li>

      <li className="px-4 text-lg font-medium transition-colors">
        <Link className="text-black dark:text-white  hover:text-slate-600 dark:hover:text-slate-400" to="/about">About</Link>
      </li>

      <li className="px-4 text-lg font-medium transition-colors">
        <Link className="text-black dark:text-white  hover:text-slate-600 dark:hover:text-slate-400" to="/contact">Contact</Link>
      </li>
    </>
  );

  const MoveToCart = (e) => {
    e.preventDefault();
    if (!authUser) {
      const toastId = toast.error("You must log in first to access the Cart.");
      setTimeout(() => toast.dismiss(toastId), 3000);
      return;
    }
    navigate("/cart");
  };

  // theme aware classes
  const isDark = theme === "dark";
  const navBg = isDark
    ? (sticky ? "bg-slate-800/55 backdrop-blur-md shadow-md" : "bg-slate-800")
    : (sticky ? "bg-slate-100/55 backdrop-blur-md shadow-md" : "bg-gray-100");
  const navText = isDark ? "text-white" : "text-black";
  const mobileMenuBg = isDark ? "bg-slate-800" : "bg-white";
  const mobileBorder = isDark ? "border-gray-700" : "border-gray-200";
  const loginBtnClass = isDark
    ? "bg-teal-700 text-white px-4 py-2 rounded-md font-semibold hover:bg-teal-800 transition-colors cursor-pointer"
    : "bg-pink-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-pink-600 transition-colors cursor-pointer";

  // new: consistent toggle button classes (same size & padding, good contrast in both themes)
  const toggleBtnClass = `w-10 h-10 p-2 flex items-center justify-center rounded-full transition-colors shadow-lg
    ${isDark ? "bg-slate-700/50 border-gray-600" : "bg-white/95 border-gray-200"}`;

  const lightIconClass = "h-6 w-6 text-yellow-400";
  const darkIconClass = "h-6 w-6 text-blue-400";

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg} ${navText}`}
      >
        <div className="max-w-screen-2xl mx-auto flex justify-between items-center px-6 py-3">

          {/* Brand / Logo */}
          <Link
            to="/"
            className={`md:text-2xl text-xl font-bold tracking-wide ml-[-10px] md:ml-4 ${navText}  hover:text-slate-600 dark:hover:text-slate-400 transition-all`} 
          >
            BookNest
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center space-x-4">
            {navItems}
            <li>
              <p
                onClick={MoveToCart}
                className={`text-2xl cursor-pointer  hover:text-slate-600 dark:hover:text-slate-400 transition-colors ${navText}`}
              >
                <IoCartOutline />
              </p>
            </li>
          </ul>

          {/* Right-side controls */}
          <div className="flex items-center space-x-4">

            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className={toggleBtnClass}
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={lightIconClass}
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className={darkIconClass}
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
                </svg>
              )}
            </button>

            {/* Auth Buttons */}
            {authUser ? (
              <Logout />
            ) : (
              <div>
                <Link
                  className={loginBtnClass}
                  onClick={() => document.getElementById('my_modal_3')?.showModal()}
                >
                  Login
                </Link>
                <Login />
              </div>
            )}
            <div>
              <button
                className="border-black hover:dark:border-teal-700 hover:border-pink-600 dark:border-white border px-4 py-1.5 rounded-md font-semibold transition-colors cursor-pointer"
                onClick={() => document.getElementById('admin_modal')?.showModal()}
              >
                Admin
              </button>

              {/* Place modal here so it's part of the DOM */}
              <AdminLogin />
            </div>

            {/* Hamburger Icon (mobile) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden focus:outline-none ${navText}`}
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>

          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className={`md:hidden flex justify-center ${mobileMenuBg} py-3 border-t ${mobileBorder} ${navText}`}>
            <ul className="flex flex-col items-center space-y-3 text-sm">
              {navItems}
              <li>
                <p
                  onClick={MoveToCart}
                  className={`text-2xl cursor-pointer hover:text-[#00FFC8] transition-colors ${navText}`}
                >
                  <IoCartOutline />
                </p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
