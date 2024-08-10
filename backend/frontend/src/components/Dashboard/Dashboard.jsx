import React from "react";
import AxiosInstance from "../../Api/AxiosInstance";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  console.log("This is dashboard ");

  const jwt = localStorage.getItem("access_token");
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  console.log("jwt------------------------------->", jwt);
  console.log("userString------------------------->", userString);
  console.log("user------------------------------->", user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!jwt || !user) {
      navigate("/login");
    } else {
      getSomeData();
    }
  }, [jwt, user, navigate]);

  const getSomeData = async () => {
    try {
      const res = await AxiosInstance.get("get-something/");
      // Handle response
    } catch (error) {
      console.error("Error fetching data:", error);
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

  return (
    <div className="container">
      <h1>{user ? user.full_name : "User not available"}</h1>
      <h2>{user ? user.email : <p>No User Email</p>}</h2>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
