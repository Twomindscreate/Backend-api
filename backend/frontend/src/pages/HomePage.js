import React from 'react';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';
import { FaRegSmile } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div>
      <Card className="bg-primary text-white text-center">
        <CardBody>
          <h1 className="display-4">Welcome to the Project Management App</h1>
          <p className="lead">Manage your teams, projects, and tasks efficiently.</p>
          <Button color="light" size="lg" href="/profile">Get Started</Button>
        </CardBody>
      </Card>

      <Container className="my-5">
        <Row>
          <Col md="4">
            <div className="text-center">
              <FaRegSmile size={60} color="primary" />
              <h2 className="mt-3">Teams</h2>
              <p>Organize and manage your teams effectively.</p>
            </div>
          </Col>
          <Col md="4">
            <div className="text-center">
              <FaRegSmile size={60} color="secondary" />
              <h2 className="mt-3">Projects</h2>
              <p>Keep track of all your projects and milestones.</p>
            </div>
          </Col>
          <Col md="4">
            <div className="text-center">
              <FaRegSmile size={60} color="success" />
              <h2 className="mt-3">Tasks</h2>
              <p>Manage your tasks and deadlines efficiently.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;