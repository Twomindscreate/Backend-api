import React, { useState, useEffect } from "react";
import AxiosInstance from "../../Api/AxiosInstance";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";

const useLogin = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    // No setupAxiosInterceptors function anymore; remove this if it was previously used
  }, [navigate]);

  const handleOnChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await AxiosInstance.post("login/", loginData);
      if (response.status === 200) {
        localStorage.setItem("token", JSON.stringify(response.data.access));
        localStorage.setItem(
          "refresh_token",
          JSON.stringify(response.data.refresh)
        );
        navigate("/dashboard");
        toast.success("Login successfully");
      }
    } catch (error) {
      console.error("Login error:", error); // Debugging error
      if (error.response) {
        toast.error(error.response.data.detail);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const refresh = localStorage.getItem("refresh_token");
    const token = localStorage.getItem("token");

    try {
      const response = await AxiosInstance.post(
        "logout/",
        { refresh_token: refresh },
        { headers: { Authorization: `Bearer ${token}` } } // Add Authorization header
      );

      if (response.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        navigate("/login");
        toast.warn("Logout successful");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      if (error.response) {
        toast.error(
          error.response.data.detail || "An error occurred. Please try again."
        );
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return {
    handleOnChange,
    handleOnSubmit,
    handleLogout, // Ensure handleLogout is returned if used elsewhere
    loading,
    loginData,
  };
};

export default useLogin;
