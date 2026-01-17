import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");

  const handleLogout = async () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <div className="h-20 flex ">
      <div className="flex flex-3 justify-around items-center">
        <h2 className="text-pink-700 font-bold text-xl md:text-2xl">Admin</h2>
        {token && (
          <nav>
            <ul className="flex gap-15  text-gray-700">
              <Link to="/">
                <li>Home</li>
              </Link>

              <Link to="/dashboard">
                <li>Dashboard</li>
              </Link>
              <Link to="/list">
                <li>list</li>
              </Link>
            </ul>
          </nav>
        )}
      </div>
      <div className="flex-1 flex items-center px-5 bg-blue-50">
        <div className="flex gap-5">
          {/* <h2 className="text-blue-600 font-semibold">Akshay kumar</h2> */}
          {token && (
            <button
              onClick={handleLogout}
              className=" bg-red-500 rounded px-2 py-1 cursor-pointer text-white"
            >
              logout
            </button>
          )}

          {
            !token && <button
              
              className=" bg-red-500 rounded px-2 py-1 cursor-pointer text-white"
            >
              Login Now
            </button>
          }
        </div>
      </div>
    </div>
  );
}
