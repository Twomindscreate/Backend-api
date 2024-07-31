import { useState } from "react";
import { registerUser } from "../api/userService";
import { useNavigate } from "react-router-dom";



const useRegister = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repassword: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      setMessage(response.data.message);
      navigate("/login");
    } catch (error) {
      setMessage(error.response.data.repassword || "Registration failed");
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    message,
  };
};

export default useRegister;
