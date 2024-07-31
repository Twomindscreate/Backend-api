import React from "react";
import useLogin from "../../hooks/userLogin";

const Login = () => {
  const { formData, handleChange, handleSubmit, message, tokens } = useLogin();
  return (
    <div className="container">
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
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
