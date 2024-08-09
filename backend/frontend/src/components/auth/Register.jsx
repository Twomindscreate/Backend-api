import React from "react";
import useRegister from "../../hooks/Authentication/useRegister";
import "./auth.css";
import { Container, Form, Button, Divider, Grid } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";

const Register = () => {
  const {
    handleOnChange,
    handleOnSubmit,
    loading,
    registerData,
    error,
  } = useRegister();

  const { email, first_name, last_name, password, password2 } = registerData;

  return (
    <Container text>
      <Form className="ui form" onSubmit={handleOnSubmit}>
        <h2 className="ui header">
          <i className="user secret icon"></i>Registration Form
        </h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Form.Field required>
          <label>
            <Icon name="mail" color="blue" /> Email
          </label>
          <input
            placeholder="Email"
            type="email"
            className="glowing-input"
            name="email"
            value={email}
            onChange={handleOnChange}
            required
          />
        </Form.Field>
        <Form.Group widths="equal">
          <Form.Field required>
            <label>
              <Icon name="user" color="teal" /> First Name
            </label>
            <input
              placeholder="First Name"
              type="text"
              className="glowing-input"
              name="first_name"
              value={first_name}
              onChange={handleOnChange}
              required
            />
          </Form.Field>
          <Form.Field required>
            <label>
              <Icon name="user" color="teal" /> Last Name
            </label>
            <input
              placeholder="Last Name"
              type="text"
              className="glowing-input"
              name="last_name"
              value={last_name}
              onChange={handleOnChange}
              required
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field required>
            <label>
              <Icon name="lock" color="red" /> Password
            </label>
            <input
              placeholder="Password"
              type="password"
              className="glowing-input"
              name="password"
              value={password}
              onChange={handleOnChange}
              required
            />
          </Form.Field>
          <Form.Field required>
            <label>
              <Icon name="lock" color="red" /> Confirm Password
            </label>
            <input
              placeholder="Confirm Password"
              type="password"
              className="glowing-input"
              name="password2"
              value={password2}
              onChange={handleOnChange}
              required
            />
          </Form.Field>
        </Form.Group>

        <Button type="submit" color="blue">
          <Icon name="check" color="grey" />
          {loading ? "Registering..." : "Register"}
        </Button>
        <Divider horizontal>Or</Divider>
        <p className="test">
          Already have an account? <a href="/login">Login</a>
        </p>
      </Form>
    </Container>
  );
};

export default Register;
