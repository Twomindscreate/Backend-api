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
  console.log("render");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      navigate("/login");
    } catch (error) {
      setMessage(error.response.data);
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
