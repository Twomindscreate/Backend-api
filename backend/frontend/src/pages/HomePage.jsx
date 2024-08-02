import React from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Main.css";

import Login from "../components/auth/Login";
const HomePage = () => {
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
          <Login />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
