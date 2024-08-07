import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Container, Button, Input, Icon } from "semantic-ui-react";
import useLogin from "../../hooks/Authentication/useLogin"; // Ensure this path is correct
import "./auth.css";

const LoginForm = () => {
  const { formData, handleChange, handleSubmit, message } = useLogin();
  const [validation, setValidation] = useState({
    username: true,
    password: true,
  });
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let isValid = true;
    if (name === "username" && value.trim() === "") {
      isValid = false;
    }
    if (name === "password" && value.trim() === "") {
      isValid = false;
    }
    setValidation((prev) => ({ ...prev, [name]: isValid }));
    return isValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const isUsernameValid = validateField("username", formData.username);
    const isPasswordValid = validateField("password", formData.password);

    // If any field is invalid, stop form submission
    if (!isUsernameValid || !isPasswordValid) {
      return;
    }

    // If all fields are valid, proceed with the form submission
    handleSubmit(e);
    if (!message) {
      navigate("/dashboard", { replace: true });
    }
  };

  return (
    <Container textAlign="center" style={{ marginTop: "2em" }}>
      <Form
        className="ui segment"
        style={{
          maxWidth: "400px",
          margin: "auto",
          padding: "2em",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          height: "400px",
        }}
        onSubmit={onSubmit}
      >
        <h1 style={{ color: "#6252F9" }}>
          <Icon name="lock" style={{ marginRight: "10px", color: "#6252F9" }} /> Login
        </h1>
        {message && <p style={{ color: "red" }}>{message}</p>}
        
        <Form.Field
          style={{
            marginBottom: "2.5em",
            position: "relative",
            textAlign: "left",
          }}
        >
          <label style={{ color: "#6252F9", fontWeight: "bold", marginTop: "2rem" }}>
            <Icon name="user" style={{ marginRight: "5px" }} /> Username
          </label>
          <Input
            placeholder="Username"
            icon="user"
            iconPosition="left"
            name="username"
            value={formData.username}
            onChange={(e) => {
              handleChange(e);
              validateField(e.target.name, e.target.value);
            }}
            style={{
              borderRadius: "5px",
              borderColor: validation.username ? "#00C100" : "#C10000", // Green if valid, red if invalid
              transition: "border-color 0.3s ease, box-shadow 0.3s ease",
              marginTop: "5px",
            }}
            onFocus={(e) => {
              e.target.style.boxShadow = "0 0 8px rgba(98, 82, 249, 0.5)";
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = "none";
            }}
            required
          />
        </Form.Field>
        
        <Form.Field
          style={{
            marginBottom: "2em",
            position: "relative",
            textAlign: "left",
          }}
        >
          <label style={{ color: "#6252F9", fontWeight: "bold" }}>
            <Icon name="lock" style={{ marginRight: "5px" }} /> Password
          </label>
          <Input
            placeholder="Password"
            type="password"
            icon="lock"
            iconPosition="left"
            name="password"
            value={formData.password}
            onChange={(e) => {
              handleChange(e);
              validateField(e.target.name, e.target.value);
            }}
            style={{
              borderRadius: "5px",
              borderColor: validation.password ? "#00C100" : "#C10000", // Green if valid, red if invalid
              transition: "border-color 0.3s ease, box-shadow 0.3s ease",
              marginTop: "5px",
            }}
            onFocus={(e) => {
              e.target.style.boxShadow = "0 0 8px rgba(98, 82, 249, 0.5)";
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = "none";
            }}
            required
          />
        </Form.Field>

        <Button
          primary
          fluid
          content="Login"
          icon="sign in"
          labelPosition="left"
          style={{
            backgroundColor: "#6252F9",
            color: "#fff",
            borderRadius: "5px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "background-color 0.3s ease, box-shadow 0.3s ease",
            marginTop: "2.5rem",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#4a3d8c";
            e.target.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.3)";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#6252F9";
            e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
          }}
        />

        <div style={{ marginTop: "1.5rem" }}>
          <p className="DN">
            Don't have an account?{" "}
            <a href="/register" style={{ color: "#6252F9", fontWeight: "bold" }}>
              Register here
            </a>
          </p>
        </div>
      </Form>
    </Container>
  );
};

export default LoginForm;
