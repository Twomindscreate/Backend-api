import { useState } from "react";
import { loginUser } from "../api/userService";

import React from "react";

const userLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [tokens, setTokens] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      setTokens(response.data);
      setMessage("Login Successful!");
    } catch (error) {
      setMessage(error.response.data.detail || "Invalid credentials!");
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    message,
    tokens,
  };
};

export default userLogin;
