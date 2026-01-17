import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

export default function Register() {


  const navigate= useNavigate()

//   const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
//   const [gender,setGender]=useState("")
//   const [dob,setDob]=useState("")
   const [error, setError] = useState("");

   // const backendUrl = import.meta.env.VITE_BACKEND_URL;
   const backendUrl = "https://admin-otp-backend.onrender.com"

  // console.log(email,password)

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    console.log(email,password)


    if ( !email || !password) {
      setError("All fields are required");
      return;
    }

    if (!email.includes("@")) {
      setError("Invalid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const data={
      email,
      password,
     
    }

    // console.log(name,email,password,gender,dob)

    // console.log(data)

    try {
      const res = await axios.post(`${backendUrl}/api/admin/register`,data,
        {
          headers:{
            'Content-Type':"application/json"
          },
          withCredentials:true,
        }
      )

      console.log(res)
      // console.log(response);
      // if(data.success=='false')
      // {
      //   setError(data.message)
      // }

      console.log(res.data);
      

     
      setEmail("")
      
     
      setPassword("")

      navigate('/login')

    } catch (error) {
      if (error.response) {
      setError(error.response.data.message);
    } else {
      
      setError("Server not responding");
    }

    }

  };

  return (
    <div className="flex h-[80vh]  justify-center items-center ">
      <form
        onSubmit={handleSubmit}
        className=" p-5 border border-blue-300 rounded   w-90 "
      >
        <h2 className="text-center text-2xl font-bold text-blue-600">
          Register
        </h2>

        {error && (
          <p className="text-red-600 text-sm text-center mt-2">{error}</p>
        )}

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
          Register
        </button>
        <div className="flex items-center gap-2 ">
          <p className="text-gray-700 text-sm">login Admin </p>
          <Link to="/login">
            <span className="text-blue-600 text-sm">Login Now</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
