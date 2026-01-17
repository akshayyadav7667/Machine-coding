import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // const backendUrl = import.meta.env.VITE_BACKEND_URL;
   const backendUrl = "https://admin-otp-backend.onrender.com"

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    console.log(otp, location.state);

    const data = {
      email: location.state,
      otp,
    };

    if (!otp) {
      setError("Plz enter Otp");
    }

    try {
      const res = await axios.post(`${backendUrl}/api/admin/verifyOtp`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

    //   console.log("ADMIN:", res.data.email);
    //   console.log("TOKEN:", res.data.token);

      localStorage.setItem("adminToken", res.data.token);

    //   console.log(res.data);
      if (res.data.message) {
        navigate("/");
      } else {
        setError("wrong otp ");
      }
    } catch (error) {
      setError(error.response?.data?.message);
    }
  };

  return (
    <div className="flex h-[80vh] justify-center items-center">
      <form
        onSubmit={handleVerifyOtp}
        className="p-5 border border-blue-300 rounded w-90"
      >
        <h2 className="text-center text-2xl font-bold text-blue-600">
          Verify OTP
        </h2>

        {error && <p className="text-center m-2 text-red-500">{error}</p>}

        <div className="flex flex-col py-2">
          <label>OTP</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6-digit OTP"
            className="border border-gray-300 px-2 rounded py-1"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-1 my-3 w-full"
        >
          Verify OTP
        </button>


        
      </form>
    </div>
  );
}
