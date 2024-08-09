import React, { useState } from "react";
import { Form, Button, Header, Container } from "semantic-ui-react";
import "./EnterNewPassword.css";

const EnterNewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") setPassword(value);
    if (name === "confirm_password") setConfirmPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submit logic here
  };

  return (
    <div className="new-password-page">
      <Container textAlign="center" className="form-container">
        <div className="wrapper">
          <Header as="h2" className="form-header">
            Enter your New Password
          </Header>
          <Form onSubmit={handleSubmit}>
            <Form.Field className="form-group">
              <label htmlFor="password" className="form-label">
                New Password
              </label>
              <input
                type="password"
                className="email-form"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Enter your new password"
                required
              />
            </Form.Field>
            <Form.Field className="form-group">
              <label htmlFor="confirm_password" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="email-form"
                name="confirm_password"
                value={confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your new password"
                required
              />
            </Form.Field>
            <Button type="submit" className="vbtn" fluid>
              Submit
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default EnterNewPassword;
