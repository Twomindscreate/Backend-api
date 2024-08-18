import { useState } from "react";

import AxiosInstance from "../../Api/AxiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
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
      const res = await AxiosInstance.post("login/", loginData);

      if (res.status === 200) {
        const response = res.data;
        const user = {
          full_name: response.full_name,
          email: response.email,
        };

        localStorage.setItem("token", JSON.stringify(response.access_token));
        localStorage.setItem(
          "refresh_token",
          JSON.stringify(response.refresh_token)
        );

        localStorage.setItem("user", JSON.stringify(user)); // Save user info

        navigate("/dashboard");
        toast.success("Login successful");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  return {
    handleOnChange,
    handleOnSubmit,
    loading,
    loginData,
  };
};

export default useLogin;
