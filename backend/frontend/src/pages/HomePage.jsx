import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardBody,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomePage.css";
import useLogin from "../../src/hooks/useLogin";

const HomePage = () => {
  const { formData, handleChange, handleSubmit, message } = useLogin();

  return (
    <Container
      fluid
      className="vh-100 d-flex align-items-center justify-content-center home-container"
    >
      <Row className="w-100 justify-content-center">
        <Col
          md={4}
          className="d-flex flex-column justify-content-center align-items-center p-4"
        >
          <Card className="w-100 task-manager-card">
            <CardBody className="text-center">
              <h1 className="display-9 mb-2">
                Manage all your tasks in one place
              </h1>
            </CardBody>
          </Card>
          <h2 className="font-weight-light">Task Manager</h2>
        </Col>
        <Col
          md={4}
          className="d-flex flex-column justify-content-center align-items-center p-5"
        >
          <Form className="w-100" onSubmit={handleSubmit}>
            <h3 className="mb-4">Welcome Back!</h3>
            {message && <p className="text-danger">{message}</p>}
            <FormGroup floating>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
              <Label for="username">Username</Label>
            </FormGroup>
            <FormGroup floating>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <Label for="password">Password</Label>
            </FormGroup>
            <Button color="primary" className="w-100 mb-3" type="submit">
              Login
            </Button>
            <div className="d-flex justify-content-between">
              <a href="/register" className="text-primary">
                <i className="fas fa-user-plus"></i> Register
              </a>
              <a href="/forgot-password" className="text-primary">
                <i className="fas fa-key"></i> Forgot Password?
              </a>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
