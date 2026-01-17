import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import AdminHome from "./Pages/AdminHome";
import Dashboard from "./Pages/Dashboard";
import List from "./Pages/List";
import Login from "./Pages/Login";
import VerifyOtp from "./Pages/VerifyOtp";
import Navbar from "./components/Navbar";
import Home from './Pages/Home'
import Register from "./Pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Login first */}
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/register" element={<Register />} />

        {/* Home AFTER login */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/list"
          element={
            <ProtectedRoute>
              <List />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
