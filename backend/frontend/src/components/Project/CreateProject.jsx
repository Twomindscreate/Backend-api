import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  Button,
  Card,
  Icon,
  Form,
  Grid,
} from "semantic-ui-react";
import "../../components/main.css"; // Custom CSS for animations and styles
import projectimg from "../../assets/images/pj1.png"; // Ensure this path is correct
import useProjectCRUD from "../../hooks/Project/useProjectCRUD";
import useTeamCRUD from "../../hooks/Team/useTeamCRUD";

const CreateProject = () => {
  const {
    projects = [],
    loading,
    handleCreateProject,
    handleFetchProjects,
    handleUpdateProject,
    handleDeleteProject,
  } = useProjectCRUD();

  const { teams = [], handleFetchTeams } = useTeamCRUD();

  const [open, setOpen] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const [projectForm, setProjectForm] = useState({});

  return (
    <Container>
      {!showCreateProject ? (
        <>
          <Header as="h1" textAlign="center">
            My Projects
          </Header>
          <div className="filter-buttons">
            <Button onClick={() => handleFilterChange("All")}>All</Button>
            <Button onClick={() => handleFilterChange("Pending")}>
              Pending
            </Button>
            <Button onClick={() => handleFilterChange("Complete")}>
              Complete
            </Button>
            <Button onClick={() => handleFilterChange("In Progress")}>
              In Progress
            </Button>
          </div>

          <Card.Group>
            <Card
              className="create-project-card"
              onClick={handleCreateProjectClick}
            >
              <Card.Content>
                <Icon name="add circle" size="huge" />
                <Card.Header>Create New Project</Card.Header>
              </Card.Content>
            </Card>
            {filteredProjects.map((project, index) => (
              <Card className="project-card" key={index}>
                <Card.Content>
                  <Card.Header>{project.name}</Card.Header>
                  <Card.Meta>
                    <span className="date">
                      Start Date: {project.start_date}
                    </span>
                    <span className="date">End Date: {project.end_date}</span>
                  </Card.Meta>
                  <Card.Description>{project.description}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </>
      ) : (
        <Grid stackable>
          <Grid.Row>
            <Grid.Column computer={8} tablet={16} mobile={16}>
              <img src={projectimg} alt="Project" className="project-image" />
            </Grid.Column>
            <Grid.Column computer={8} tablet={16} mobile={16}>
              <div className="create-project-form">
                <Form onSubmit={handleCreateProject}>
                  <Form.Input
                    label="Project Name"
                    placeholder="Project Name"
                    required
                  />
                  <Form.TextArea
                    label="Description"
                    placeholder="Project Description"
                    required
                  />
                  <Form.Dropdown
                    label="Team"
                    placeholder="Select Team"
                    fluid
                    selection
                    options={teams}
                    required
                  />
                  <Form.Input type="date" label="Start Date" required />
                  <Form.Input type="date" label="End Date" required />
                  <Button type="submit" primary>
                    Create Project
                  </Button>
                  <Button
                    type="button"
                    secondary
                    onClick={handleCancelCreateProject}
                  >
                    Cancel
                  </Button>
                </Form>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
    </Container>
  );
};

export default CreateProject;
