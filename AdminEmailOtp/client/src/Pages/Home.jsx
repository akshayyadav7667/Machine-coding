import React from "react";

export default function AdminHome() {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-blue-600">
        Admin Dashboard
      </h1>

      <p className="mt-3 text-gray-600">
        Welcome Admin, manage your application here.
      </p>
    </div>
  );
}
