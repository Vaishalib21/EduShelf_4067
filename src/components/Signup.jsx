import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import { useAuth } from "../context/AuthProvider";

function Signup() {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useAuth(); // 🔥 important
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post("https://edushelf-4067.onrender.com/user/signup", userInfo);

      if (res.data) {
        toast.success("Signup Successful");

        localStorage.setItem("Users", JSON.stringify(res.data.user));

        setAuthUser(res.data.user); // 🔥 important

        navigate("/course");
      }
    } catch (err) {
      if (err.response) {
        toast.error("Error: " + err.response.data.message);
      } else {
        toast.error("Signup failed");
      }
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-white dark:bg-slate-900">
      <div className="w-[400px] p-6 border rounded-lg shadow-lg dark:bg-slate-800 relative">

        {/* ❌ Close Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute right-3 top-3 text-xl font-bold hover:text-red-500"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center mb-4">Signup</h2>

        <form onSubmit={handleSubmit(onSubmit)}>

          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-3 py-2 border rounded-md mb-3"
            {...register("fullname", { required: "Full name is required" })}
          />
          {errors.fullname && <p className="text-red-500">{errors.fullname.message}</p>}

          {/* ✅ EMAIL VALIDATION ADDED */}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded-md mb-3"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                message: "Enter a valid email address",
              },
            })}
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}

          {/* ✅ PASSWORD VALIDATION ADDED */}
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded-md mb-3"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                message: "Must include uppercase, lowercase & number",
              },
            })}
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          {/* ✅ Helper text */}
          <p className="text-xs text-gray-400 mb-3">
            Password must contain uppercase, lowercase and a number
          </p>

          <button className="w-full bg-pink-500 text-white py-2 rounded">
            Signup
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <button onClick={() => setShowLoginModal(true)} className="text-blue-500 underline">
            Login
          </button>
        </p>

        {showLoginModal && (
          <Login onClose={() => setShowLoginModal(false)} />
        )}
      </div>
    </div>
  );
}

export default Signup;