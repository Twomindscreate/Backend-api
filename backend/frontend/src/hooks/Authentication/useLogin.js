import { useState } from "react";
import { loginUser } from "../../api/userService";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      localStorage.setItem("accessToken", response.data.access); // Store the token
      navigate("/dashboard", { replace: true }); // Redirect to dashboard
    } catch (error) {
      console.error("Login error:", error); // Log the error
      setMessage("Login failed. Please try again.");
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    message,
  };
};

export default useLogin;
