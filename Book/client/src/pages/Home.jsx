import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Book Inventory Management
      </h1>

     
      <div className="bg-white rounded-lg shadow-md p-6">
        
        
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Welcome to Book Store
        </h2>

       
        <p className="text-gray-600 mb-6">
          Manage your books easily. You can add new books, view book details,
          update existing records, and remove books from the inventory.
        </p>

        
        <div className="flex gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition">
            ➕ Add Book
          </button>

          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded transition">
            📖 View Books
          </button>
        </div>
      </div>

    </div>
  );
}
