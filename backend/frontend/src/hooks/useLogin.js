import { useState } from "react";
import { loginUser } from "../api/userService";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [tokens, setTokens] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      setTokens(response.data);
      setMessage("Login Successful!");
      navigate("/Dashboard");
    } catch (error) {
      setMessage(error.response.data.detail);
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

export default useLogin;
