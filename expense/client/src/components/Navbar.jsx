import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="h-20 flex ">
      <div className="flex flex-3 justify-around items-center">
        <h2 className="text-pink-700 font-bold text-xl md:text-2xl">
          Expense Track
        </h2>
        <nav>
          <ul className="flex gap-15  text-gray-700">
            <Link to="/" >
              <li>Home</li>
            </Link>

            <Link to="/income">
              <li>Income</li>
            </Link>
            <Link to='expense'>
              <li>Expense</li>
            </Link>
          </ul>
        </nav>
      </div>
      <div className="flex-1 flex items-center px-5 bg-blue-50">
        <div className="flex gap-5">
          <h2 className="text-blue-600 font-semibold">Akshay kumar</h2>
          <Link  to='/login' className="text-pink-700">logout</Link>
        </div>
      </div>
    </div>
  );
}
