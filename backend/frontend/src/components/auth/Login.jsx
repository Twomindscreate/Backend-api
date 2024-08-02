import React from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const { formData, handleChange, handleSubmit, message } = useLogin();
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="container">
      {message && <p>{message}</p>}
      <form
        onSubmit={(e) => {
          handleSubmit(e);
          if (!message) {
            handleLoginSuccess();
          }
        }}
      >
        <h1>Login</h1>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your username"
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />

        <input type="submit" value="Login" />
        <div className="links">
          <a href="/register">Sign Up</a>
          <a href="/forgot-password">Forgot Password</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
