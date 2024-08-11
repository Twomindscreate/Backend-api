import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="center">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <div className="d-flex align-items-center justify-content-center">
        <Link to="/">Go to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
