import { useState } from "react";

import CookieUtils from "../utils/cookies-util";
import { loginUser } from "../api/userService";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { setCookie, removeCookie } = CookieUtils();
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
      setCookie.set("access_token", response.data.access);
      setCookie.set("refresh_token", response.data.refresh);
      setMessage("Login Successful!");
      navigate("/Dashboard");
    } catch (error) {
      setMessage(error.response.data.detail);
    }
  };

  const logout = () => {
    removeCookie("access_token");
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    message,
    tokens,
    logout,
  };
};

export default useLogin;
