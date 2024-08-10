// import React from "react";
// import Sidebar from "../components/Dashboard/Sidebar";
// import { Navigate } from "react-router-dom";

// const PrivateRoute = ({ children }) => {
//   // Check if the user is authenticated
//   const isAuthenticated = !!localStorage.getItem("token");

//   // If authenticated, render children; otherwise, redirect to login
//   return isAuthenticated ? (
//     <>
//       <Sidebar>
//         <div className="main-container">{children}</div>
//       </Sidebar>
//     </>
//   ) : (
//     <Navigate to="/login" />
//   );
// };

// export default PrivateRoute;
