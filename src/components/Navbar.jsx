import React, { useEffect, useState } from "react";
import Login from "./Login";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Navbar() {
  const [authUser, setAuthUser] = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [sticky, setSticky] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const element = document.documentElement;

  // Theme
  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      element.classList.remove("dark");
      document.body.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Sticky Navbar
  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("Users");
    setAuthUser(null);
    setShowDropdown(false);
  };

  return (
    <div
      className={`max-w-screen-2xl container mx-auto md:px-20 px-4 fixed top-0 left-0 right-0 z-50 ${
        sticky
          ? "shadow-md bg-base-200 dark:bg-slate-700"
          : "bg-base-100 dark:bg-slate-800"
      }`}
    >
      <div className="navbar py-3">

        {/* LEFT SIDE */}
        <div className="navbar-start flex items-center gap-3 relative">

          {/* Profile Circle */}
          {authUser && (
            <div
              className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {authUser.fullname.charAt(0).toUpperCase()}
            </div>
          )}

          {/* Dropdown Dashboard */}
          {showDropdown && authUser && (
            <div className="absolute top-14 left-0 bg-white dark:bg-slate-800 shadow-lg rounded-lg w-52 p-4 z-50">

              <p className="font-semibold text-lg text-black dark:text-white">
                Hi, {authUser.fullname}
              </p>

              <button
                className="mt-3 w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-700 duration-200"
                onClick={handleLogout}
              >
                Logout
              </button>

            </div>
          )}

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold cursor-pointer">
            EduShelf
          </Link>

        </div>

        {/* CENTER MENU */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/course">Course</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="navbar-end flex items-center gap-3">

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-xl"
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>

          {/* Login Button */}
          {!authUser && (
            <>
              <button
                className="bg-black text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300"
                onClick={() => setShowLoginModal(true)}
              >
                Login
              </button>

              {showLoginModal && (
                <Login
                  onLoginSuccess={(user) => {
                    setAuthUser(user);
                    setShowLoginModal(false);
                  }}
                  onClose={() => setShowLoginModal(false)}
                />
              )}
            </>
          )}

        </div>

      </div>
    </div>
  );
}

export default Navbar;