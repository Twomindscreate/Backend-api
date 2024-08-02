import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if an access token is present in local storage
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    // Clear the authentication tokens
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken"); // Optional, if using refresh tokens

    // Update authentication state
    setIsAuthenticated(false);

    // Redirect to the login page
    navigate("/login", { replace: true });
  };

  return { isAuthenticated, handleLogout };
};
