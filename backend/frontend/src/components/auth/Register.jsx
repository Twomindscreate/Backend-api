import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Container, Button, Input, Icon } from "semantic-ui-react";
import useRegister from "../../hooks/Authentication/useRegister";
import "./auth.css";

const Register = () => {
  const { formData, handleChange, handleSubmit, message } = useRegister();
  const [validation, setValidation] = useState({
    username: true,
    email: true,
    password: true,
    repassword: true
  });
  const navigate = useNavigate();

  const handleRegisterSuccess = () => {
    navigate("/login", { replace: true });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);
    if (!message) {
      handleRegisterSuccess();
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case "username":
        setValidation((prev) => ({ ...prev, username: value.length >= 3 }));
        break;
      case "email":
        // Simple email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setValidation((prev) => ({ ...prev, email: emailRegex.test(value) }));
        break;
      case "password":
        setValidation((prev) => ({ ...prev, password: value.length >= 6 }));
        break;
      case "repassword":
        setValidation((prev) => ({ ...prev, repassword: value === formData.password }));
        break;
      default:
        break;
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
          height: "600px", // Adjust height if necessary
        }}
        onSubmit={onSubmit}
      >
        <h1 style={{ color: "#6252F9" }}>
          <Icon name="user" style={{ marginRight: "10px", color: "#6252F9" }} /> Register
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
            placeholder="Enter your username"
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
            marginBottom: "2.5em",
            position: "relative",
            textAlign: "left",
          }}
        >
          <label style={{ color: "#6252F9", fontWeight: "bold" }}>
            <Icon name="mail" style={{ marginRight: "5px" }} /> Email
          </label>
          <Input
            placeholder="Enter your email"
            type="email"
            icon="mail"
            iconPosition="left"
            name="email"
            value={formData.email}
            onChange={(e) => {
              handleChange(e);
              validateField(e.target.name, e.target.value);
            }}
            style={{
              borderRadius: "5px",
              borderColor: validation.email ? "#00C100" : "#C10000", // Green if valid, red if invalid
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
            marginBottom: "2.5em",
            position: "relative",
            textAlign: "left",
          }}
        >
          <label style={{ color: "#6252F9", fontWeight: "bold" }}>
            <Icon name="lock" style={{ marginRight: "5px" }} /> Password
          </label>
          <Input
            placeholder="Enter your password"
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
        
        <Form.Field
          style={{
            marginBottom: "2.5em",
            position: "relative",
            textAlign: "left",
          }}
        >
          <label style={{ color: "#6252F9", fontWeight: "bold" }}>
            <Icon name="lock" style={{ marginRight: "5px" }} /> Confirm Password
          </label>
          <Input
            placeholder="Confirm your password"
            type="password"
            icon="lock"
            iconPosition="left"
            name="repassword"
            value={formData.repassword}
            onChange={(e) => {
              handleChange(e);
              validateField(e.target.name, e.target.value);
            }}
            style={{
              borderRadius: "5px",
              borderColor: validation.repassword ? "#00C100" : "#C10000", // Green if valid, red if invalid
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
          type="submit"
          primary
          fluid
          content="Register"
          icon="signup"
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
      </Form>
    </Container>
  );
};

export default Register;
