import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-slate-900 text-white px-10 py-4 flex items-center justify-between">
     
      <h1 className="text-2xl font-bold flex-5">
         BookStore
      </h1>

      
      <nav className="flex gap-8 flex-2">
        <Link
          to="/"
          className="text-gray-200 hover:text-white transition"
        >
          Home
        </Link>
        <Link
          to="/book"
          className="text-gray-200 hover:text-white transition"
        >
          Book
        </Link>
        <Link
          to="/book"
          className="text-gray-200 hover:text-white transition"
        >
          About
        </Link>
        <Link
          to="/book"
          className="text-gray-200 hover:text-white transition"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}
