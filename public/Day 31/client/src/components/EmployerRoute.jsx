import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function EmployerRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "employer") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default EmployerRoute;
