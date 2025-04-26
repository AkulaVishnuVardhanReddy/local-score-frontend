// src/Components/Authentication/ProtectedRoute.jsx

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Example: Check if user is logged in (adjust as needed)
  const isAuthenticated = localStorage.getItem("token"); // assuming you store a token after login

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
