import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  useEffect(() => {
    const el = document.documentElement;
    if (theme === "dark") {
      el.classList.add("dark");
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      el.classList.remove("dark");
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const handleLogout = () => {
    document.cookie =
      "admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/", { replace: true });
  };

  const isDark = theme === "dark";
  const navBg = isDark ? "bg-slate-800 text-white" : "bg-white text-black";
  const btnBg = isDark ? "bg-slate-700" : "bg-white";
  const mobileMenuBg = isDark ? "bg-slate-800 text-white" : "bg-white text-black";
  const borderColor = isDark ? "border-gray-700" : "border-gray-300";

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 shadow z-50 ${navBg} px-4 py-3`}>
        <div className="max-w-8xl mx-auto flex items-center justify-between">

          {/* LEFT LOGO */}
          <div className="flex items-center">
            <Link
              to="/admin"
              className="text-2xl font-bold tracking-wide hover:text-teal-400"
            >
              BookNest
            </Link>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex justify-center">
            <ul className="flex items-center space-x-10 text-lg">
              <li>
                <Link to="/adminpage" className="hover:text-indigo-400">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/createbook" className="hover:text-indigo-400">
                  CreateBook
                </Link>
              </li>

              <li>
                <Link to="/allorders" className="hover:text-indigo-400">
                  Orders
                </Link>
              </li>

              <li>
                <Link to="/managebook" className="hover:text-indigo-400">
                  Manage Book
                </Link>
              </li>
            </ul>
          </div>

          {/* RIGHT BUTTONS */}
          <div className="flex items-center space-x-3">
            {/* Theme toggle stays EXACT */}
            <button
              onClick={toggleTheme}
              title="Toggle theme"
              className={`p-2 rounded-md border ${btnBg} border-gray-200 dark:border-gray-600 transition`}
              aria-pressed={isDark}
            >
              {isDark ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 3.5a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5A.75.75 0 0110 3.5zM10 16.75a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75zM3.5 10a.75.75 0 01-.75-.75v-.5a.75.75 0 011.5 0v.5A.75.75 0 013.5 10zM16.75 10a.75.75 0 01-.75-.75v-.5a.75.75 0 011.5 0v.5a.75.75 0 01-.75.75zM5.47 5.47a.75.75 0 01.53-.22.75.75 0 01.53.22l.35.35a.75.75 0 11-1.06 1.06l-.35-.35a.75.75 0 01-.22-.53.75.75 0 01.22-.53zM14.12 14.12a.75.75 0 01.53-.22.75.75 0 01.53.22l.35.35a.75.75 0 11-1.06 1.06l-.35-.35a.75.75 0 01-.22-.53.75.75 0 01.22-.53zM5.47 14.53a.75.75 0 01.53-.22.75.75 0 01.53.22l.35.35a.75.75 0 11-1.06 1.06l-.35-.35a.75.75 0 01-.22-.53.75.75 0 01.22-.53zM14.12 5.88a.75.75 0 01.53-.22.75.75 0 01.53.22l.35.35a.75.75 0 11-1.06 1.06l-.35-.35a.75.75 0 01-.22-.53.75.75 0 01.22-.53zM10 6.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
                </svg>
              )}
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>

            {/* Hamburger */}
            <button
              className="md:hidden text-3xl ml-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div
            className={`md:hidden flex flex-col items-center w-full py-4 border-t ${borderColor} ${mobileMenuBg}`}
          >
            <Link
              to="/adminpage"
              className="py-2 text-lg hover:text-indigo-400"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              to="/createbook"
              className="py-2 text-lg hover:text-indigo-400"
              onClick={() => setMenuOpen(false)}
            >
              CreateBook
            </Link>

            <Link
              to="/allorders"
              className="py-2 text-lg hover:text-indigo-400"
              onClick={() => setMenuOpen(false)}
            >
              Orders
            </Link>

            <Link
              to="/managebook"
              className="py-2 text-lg hover:text-indigo-400"
              onClick={() => setMenuOpen(false)}
            >
              Manage Book
            </Link>
          </div>
        )}
      </nav>

      {/* Prevent content from hiding under navbar */}
      <div className="pt-20"></div>
    </>
  );
}
