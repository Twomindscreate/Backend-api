import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // Check if the user is authenticated
  const isAuthenticated = !!localStorage.getItem("accessToken");

  // If authenticated, render children; otherwise, redirect to login
  return isAuthenticated ? (
    <>
      <Sidebar>
        <div className="main-container">{children}</div>
      </Sidebar>
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
