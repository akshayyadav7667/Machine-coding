import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function BookDetails({ books = [] }) {
  const [pagination, setPagination] = useState({
    limit: 5,
    currentPage: 1,
    pages: 1,
  });

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      pages: Math.ceil(books.length / prev.limit),
    }));
  }, [books]);

  //   console.log(pagination);

  const updatedBook = books.slice(
    (pagination.currentPage - 1) * pagination.limit,
    pagination.currentPage * pagination.limit,
  );

  //   console.log(updatedBook);

  const totalblocks = [];

  for (let i = 1; i <= pagination.pages; i++) {
    totalblocks.push(i);
  }

  //   console.log(totalblocks);

  const handlePage = (id) => {
    console.log(id);
    setPagination((prev) => ({
      ...prev,
      currentPage: id,
    }));
  };

  const handlePrev = () => {
    // console.log(id)

    if (pagination.currentPage > 1) {
      handlePage(pagination.currentPage - 1);
    }
  };

  const handleNext = () => {
    if (pagination.currentPage < pagination.pages) {
      handlePage(pagination.currentPage + 1);
    }
  };

  return (
    <div className="overflow-x-auto rounded border border-gray-200 ">
      <table className="w-full border-collapse bg-white">
        {/* Table Head */}
        <thead className="bg-slate-100">
          <tr>
            <th className="p-4 text-center text-sm font-semibold text-gray-700">
              Image
            </th>
            <th className="p-4 text-left text-sm font-semibold text-gray-700">
              Title
            </th>
            <th className="p-4 text-left text-sm font-semibold text-gray-700">
              Author
            </th>
            <th className="p-4 text-left text-sm font-semibold text-gray-700">
              Price (₹)
            </th>
            <th className="p-4 text-center text-sm font-semibold text-gray-700">
              Action
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-gray-200">
          {books.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-8 text-center text-gray-500 text-sm">
                No books found
              </td>
            </tr>
          ) : (
            updatedBook.map((book) => (
              <tr key={book.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 text-center">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-14 h-20 object-cover rounded-md mx-auto shadow"
                  />
                </td>

                <td className="p-4 font-medium text-gray-800">{book.title}</td>

                <td className="p-4 text-gray-600">{book.author}</td>

                <td className="p-4 font-semibold text-green-600">
                  ₹{book.price}
                </td>

                <td className="p-4 text-center">
                  <Link
                    to={`/book/${book.id}`}
                    className="inline-block text-blue-600 hover:text-blue-700 font-medium hover:underline transition"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex mt-5 p-5 justify-center">
        <button
          onClick={handlePrev}
          disabled={pagination.currentPage == 1}
          className="bg-yellow-600 cursor-pointer rounded px-4 text-white mr-5 disabled:opacity-40 disabled:cursor-not-allowed"
          //   className="bg-yellow-500 rounded px-4 text-white text-center cursor-pointer mr-5"
        >
          Prev
        </button>
        <ul className="flex gap-3">
          {totalblocks.map((item, index) => (
            <li
              key={index}
              onClick={() => handlePage(index + 1)}
              className={`px-4 py-1 border ${pagination.currentPage === index + 1 ? "bg-blue-700 text-white" : "bg-blue-400 text-white hover:bg-blue-500"}  rounded cursor-pointer hover:bg-blue-400`}
            >
              {item}
            </li>
          ))}
        </ul>
        <button
          disabled={pagination.currentPage == pagination.pages}
          onClick={handleNext}
          className="bg-yellow-600 cursor-pointer rounded px-4 text-white ml-5 disabled:opacity-40 disabled:cursor-not-allowed"

          //   className="bg-yellow-500 rounded px-4 text-white cursor-pointer ml-5"
        >
          next
        </button>
      </div>
    </div>
  );
}
