import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

export default function Register() {


  const navigate= useNavigate()

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender,setGender]=useState("")
  const [dob,setDob]=useState("")
   const [error, setError] = useState("");

   const backendUrl='http://localhost:7000'

  // console.log(email,password)

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");


    if (!name || !email || !password || !gender || !dob) {
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
      name,
      email,
      password,
      gender,
      dob
    }

    // console.log(name,email,password,gender,dob)

    // console.log(data)

    try {
      const res = await axios.post(`${backendUrl}/api/user/register`,data,
        {
          headers:{
            'Content-Type':"application/json"
          }
        }
      )
      // console.log(response);
      // if(data.success=='false')
      // {
      //   setError(data.message)
      // }

      console.log(res.data);
      

      setName("")
      setEmail("")
      setDob("")
      setGender("")
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
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your Name"
            className="border  border-gray-300 px-2 rounded py-1"
          />
        </div>

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

        <div className="flex gap-5 py-2">
          <label htmlFor="name">Gender :- </label>
          <label className="flex gap-1">
            <input type="radio" name="gender" value="male" onChange={(e)=>setGender(e.target.value)}  />
            male
          </label>

          <label  className="flex gap-1">
            <input type="radio" name="gender" value="female" onChange={(e)=>setGender(e.target.value)} />
            Female
          </label>
        </div>



         <div className="flex flex-col py-2">
          <label htmlFor="dob">DOB</label>
          <input
            id="dob"
            type="date"
            name="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            placeholder="Enter your DOB"
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
          <p className="text-gray-700 text-sm">New user </p>
          <Link to="/register">
            <span className="text-blue-600 text-sm">Register Now</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
