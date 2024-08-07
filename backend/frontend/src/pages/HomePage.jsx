import React from "react";
import { Container, Grid, Segment, Image, Header } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./Main.css";
import Login from "../components/auth/Login";
import multitaskingLogo from "../assets/image/home.webp"; // Ensure this path is correct

const HomePage = () => {
  const text = "Simplify Your Schedule, Amplify Your Success.";

  return (
    <div className="page-container">
      {/* Fixed Header */}
      <Header as="h1" className="page-header">
        <div className="header-tex">
          <span className="animated-text">
            {text}
          </span>
        </div>
      </Header>
      
      <Container fluid className="home-container d-flex align-items-center justify-content-center">
        <Grid centered className="w-100">
          <Grid.Row>
            <Grid.Column
              mobile={16}
              tablet={8}
              computer={6}
              className="d-flex flex-column justify-content-center align-items-center p-4"
            >
              <Image src={multitaskingLogo} alt="Multitasking Logo" className="no-gap-image mb-4" />
              <Segment className="w-100 task-manager-card no-gap-card text-center">
                <Header as="p" className="display-4 task-manager-text">
                  Manage all your tasks in one place
                </Header>
              </Segment>
              
              <Header as="h1" className="task-manager-header">
                <span className="animated-text1">Task Manager</span>
              </Header>
            </Grid.Column>
            <Grid.Column
              mobile={16}
              tablet={8}
              computer={6}
              className="d-flex flex-column justify-content-center align-items-center p-5"
            >
              <div className="login-form">
                <Login />
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
      

    </div>
  );
};

export default HomePage;
