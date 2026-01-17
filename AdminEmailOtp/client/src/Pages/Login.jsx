import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // const backendUrl = import.meta.env.VITE_BACKEND_URL;
  // const backendUrl=" const backendUrl = "https://admin-otp-backend.onrender.com"
   const backendUrl = "https://admin-otp-backend.onrender.com"

  // console.log(email,password)

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      return setError("Fill all the details ");
    }

    if (!email.includes("@")) {
      return setError("Invalid Email Address");
    }

    const data = {
      email,
      password,
    };

    console.log(data);

    try {
      const response = await axios.post(`${backendUrl}/api/admin/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      //   console.log(response);
      setError("");
      navigate("/verify-otp", { state: email });
    } catch (error) {
      setError(
        error.response?.data?.message || err.message || "Something went wrong",
      );
    }
  };

  return (
    <div className="flex h-[80vh]  justify-center items-center ">
      <form
        onSubmit={handleSubmit}
        className=" p-5 border border-blue-300 rounded   w-90 "
      >
        <h2 className="text-center text-2xl font-bold text-blue-600">
          Admin Login
        </h2>

        {error && <p className=" text-center m-2 text-red-500">{error}</p>}

        <div className="flex flex-col py-2">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
            className="border  border-gray-300 px-2 rounded py-1"
          />
        </div>
        <div className="flex flex-col py-2">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password"
            className="border rounded py-1  border-gray-300 px-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-1 my-3 w-full"
        >
          Login
        </button>

        <div className="flex items-center gap-2 ">
          <p className="text-gray-700 text-sm">New user </p>
          <Link to="/register">
            <span className="text-blue-600 text-sm">Register Now</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
