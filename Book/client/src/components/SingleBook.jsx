import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { books } from "../utils/book";

export default function SingleBook() {
  const { id } = useParams();
  const [singleBook, setSingleBook] = useState(null);

  useEffect(() => {
    const book = books.find((item) => item.id === Number(id));
    setSingleBook(book);
  }, [id]);

  if (!singleBook) {
    return <div className="p-6 text-gray-600">Loading...</div>;
  }

  return (
    <div className="min-h-screen ">
      
      {/* Card */}
      <div className="mx-auto bg-white rounded shadow p-6">
        
        <div className="flex gap-8">
          
          {/* Image Section */}
          <div className="flex-2  flex justify-center">
            <img
              src={singleBook.image}
              alt={singleBook.title}
              className="w-70 h-80 object-cover rounded shadow"
            />
          </div>

          {/* Content Section */}
          <div className="flex-5 flex flex-col p-4 ">
            
            <h1 className="text-3xl font-bold text-gray-800 mb-3">
              {singleBook.title}
            </h1>

            <p className="text-gray-500 mb-4">
              {singleBook.description}
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
              <p><span className="font-semibold">Author:</span> {singleBook.author}</p>
              <p><span className="font-semibold text-blue-700">Genre:</span> {singleBook.genre}</p>
              <p><span className="font-semibold">Language:</span> {singleBook.language}</p>
              <p><span className="font-semibold text-green-500">Pages:</span> {singleBook.pages}</p>
              <p><span className="font-semibold text-yellow-600">Published:</span> {singleBook.publishedYear}</p>
              <p><span className="font-semibold text-pink-500">Rating:</span>  {singleBook.rating}</p>
            </div>

            <div className="mt-6 flex items-center gap-20 justify-between">
              
              <p className="text-2xl font-bold text-green-600">
               <span className="text-gray-600">Price :-</span>  ₹{singleBook.price}
              </p>

              <button className="text-sm rounded-lg border-b-2 border-t-2  border-blue-400 p-1 text-gray-500">
                Stock: {singleBook.stock}
              </button>
            </div>

            {/* Back Button */}
            <div className="mt-6">
              <Link
                to="/"
                className="inline-block px-4 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
              >
                ← Back to Books
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
