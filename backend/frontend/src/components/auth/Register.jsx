import React from "react";
import useRegister from "../../hooks/Authentication/useRegister";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  message,
  Container,
  Row,
  Col,
} from "reactstrap";
const Register = () => {
  const { formData, handleChange, handleSubmit, message } = useRegister();
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md="8" lg="6" xl="4">
          {message && <p>{message}</p>}
          <Form onSubmit={handleSubmit} className="auth-form">
            <h2>Register</h2>
            <FormGroup>
              <Label for="username">
                <FaUser className="form-icon" /> Username
              </Label>
              <Input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">
                <FaEnvelope className="form-icon" /> Email
              </Label>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">
                <FaLock className="form-icon" /> Password
              </Label>
              <Input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="repassword">
                <FaLock className="form-icon" /> Confirm Password
              </Label>
              <Input
                type="password"
                name="repassword"
                placeholder="Confirm your password"
                value={formData.repassword}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <Button type="submit" color="primary" block className="submit-btn">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
