import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<BookDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
