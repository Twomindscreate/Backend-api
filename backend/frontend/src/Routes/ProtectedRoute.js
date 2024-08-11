import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  //   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();
  const token = localStorage.getItem("token");
  let isAuthenticated = false;
  try {
    const parsedValue = JSON.parse(token);
    isAuthenticated = parsedValue?.length ? true : false;
  } catch (error) {
    isAuthenticated = false;
  }

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
