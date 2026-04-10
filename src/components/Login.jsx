import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Login({ onLoginSuccess, onClose }) {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useAuth(); // 🔥 important

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post("https://edushelf-4067.onrender.com/user/login", userInfo);

      if (res.data) {
        toast.success("Logged in Successfully");

        // ✅ store user
        localStorage.setItem("Users", JSON.stringify(res.data.user));

        // ✅ update context (MAIN FIX)
        setAuthUser(res.data.user);

        if (onLoginSuccess) onLoginSuccess(res.data.user);

        // ✅ redirect FIRST
        navigate("/course");

        // ✅ close modal AFTER
        if (onClose) onClose();
      }
    } catch (err) {
      if (err.response) {
        toast.error("Error: " + err.response.data.message);
      } else {
        toast.error("Login failed");
      }
    }
  };

  return (
    <dialog open className="modal">
      <div className="modal-box dark:bg-slate-900 dark:text-white relative">
        <form onSubmit={handleSubmit(onSubmit)}>

          {/* ❌ Close */}
          <button
            type="button"
            className="absolute right-2 top-2 btn btn-sm btn-circle btn-ghost"
            onClick={onClose}
          >
            ✕
          </button>

          <h3 className="font-bold text-lg mb-4">Login</h3>

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded-md mb-3 dark:bg-slate-800"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded-md mb-3 dark:bg-slate-800"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          <button className="bg-pink-500 text-white px-4 py-2 rounded w-full">
            Login
          </button>
        </form>
      </div>
    </dialog>
  );
}

export default Login;