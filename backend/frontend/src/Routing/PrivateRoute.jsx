import React from "react";

import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // Check if the user is authenticated
  const isAuthenticated = !!localStorage.getItem("accessToken");

  // If authenticated, render children; otherwise, redirect to login
  return isAuthenticated ? (
    <>
      <div className="main-container">{children}</div>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
