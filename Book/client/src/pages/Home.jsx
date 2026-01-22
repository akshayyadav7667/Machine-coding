import BookDetails from "./BookDetails";
import { books } from "../utils/book";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Book Inventory <span className="text-yellow-500">Management</span>
      </h1>

      {/* Top Card */}
      <div className="bg-white rounded shadow p-6 flex justify-between items-start mb-8">
        <div className="max-w-xl">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Welcome to Book Store
          </h2>

          <p className="text-gray-600">
            Manage your books easily. You can add new books, view book details,
            update existing records, and remove books from the inventory.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white w-40 h-10 rounded transition">
            + Add Book
          </button>

          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 w-40 h-10 rounded transition">
            View Books
          </button>
        </div>
      </div>

      {/* Book Table Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
           Available Books
        </h2>
        <BookDetails books={books} />
      </div>
    </div>
  );
}
