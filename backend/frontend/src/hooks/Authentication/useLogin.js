import React, { useEffect, useState, useContext } from "react";
// import { UserContext } from "../../context/ContextApi";
import AxiosInstance from "../../Api/AxiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  // console.log(useContext(UserContext));
  // const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await AxiosInstance.post("login/", loginData);
      if (response.status === 200) {
        localStorage.setItem(
          "token",
          JSON.stringify(response.data.access_token)
        );
        localStorage.setItem(
          "refresh_token",
          JSON.stringify(response.data.refresh_token)
        );
        // const response = response.data;
        // const user = {
        //   full_name: response.full_name,
        //   email: response.email,
        // };
        // setUserInfo(user);
        // localStorage.setItem("user", JSON.stringify(user)); // Save user info

        navigate("/dashboard");
        toast.success("Login successful");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const refresh = localStorage.getItem("refresh_token");
    const token = localStorage.getItem("token");
    console.log("------logout");
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
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return {
    handleOnChange,
    handleOnSubmit,
    loading,
    loginData,
    // setUserInfo,
  };
};

export default useLogin;
