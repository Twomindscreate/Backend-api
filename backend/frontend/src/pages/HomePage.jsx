import React from "react";
import { Container, Grid, Segment, Header } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "../components/main.css";
import Login from "../components/Auth/Login";
// import "./home.css";

const HomePage = () => {
  const text = "Simplify Your Schedule, Amplify Your Success.";

  return (
    <div className="bg_image">
      {/* Fixed Header */}
      <Header as="h1" className="page-header">
        <div className="header-tex">
          <span className="animated-text">{text}</span>
        </div>
      </Header>

      <Container fluid className="home-container">
        <Grid centered>
          <Grid.Row>
            <Grid.Column
              mobile={16}
              tablet={8}
              computer={6}
              className="d-flex flex-column justify-content-center align-items-center"
            >
              <Segment className="task-manager-card text-center">
                <Header as="p" className="task-manager-text">
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
              className="d-flex flex-column justify-content-center align-items-center"
            >
              <div className="trans-card">
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
