import React, { useState } from "react";
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

const teams = [
  { key: "team1", text: "Team 1", value: "team1" },
  { key: "team2", text: "Team 2", value: "team2" },
  // Add more teams here
];

const ProjectPage = () => {
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [projects, setProjects] = useState([
    {
      name: "Project 1",
      description: "Description of project 1",
      start_date: "2024-01-01",
      end_date: "2024-06-01",
      status: "Pending",
    },
    {
      name: "Project 2",
      description: "Description of project 2",
      start_date: "2024-02-01",
      end_date: "2024-07-01",
      status: "Complete",
    },
    {
      name: "Project 3",
      description: "Description of project 3",
      start_date: "2024-03-01",
      end_date: "2024-08-01",
      status: "In Progress",
    },
    {
      name: "Project 4",
      description: "Description of project 4",
      start_date: "2024-04-01",
      end_date: "2024-09-01",
      status: "Pending",
    },
    {
      name: "Project 5",
      description: "Description of project 5",
      start_date: "2024-05-01",
      end_date: "2024-10-01",
      status: "Complete",
    },
    {
      name: "Project 6",
      description: "Description of project 6",
      start_date: "2024-06-01",
      end_date: "2024-11-01",
      status: "In Progress",
    },
    {
      name: "Project 7",
      description: "Description of project 7",
      start_date: "2024-07-01",
      end_date: "2024-12-01",
      status: "Pending",
    },
    {
      name: "Project 8",
      description: "Description of project 8",
      start_date: "2024-08-01",
      end_date: "2025-01-01",
      status: "Complete",
    },
    {
      name: "Project 9",
      description: "Description of project 9",
      start_date: "2024-09-01",
      end_date: "2025-02-01",
      status: "In Progress",
    },
    {
      name: "Project 10",
      description: "Description of project 10",
      start_date: "2024-10-01",
      end_date: "2025-03-01",
      status: "Pending",
    },
  ]);
  const [filter, setFilter] = useState("All");

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  const filteredProjects = projects.filter((project) =>
    filter === "All" ? true : project.status === filter
  );

  const handleCreateProjectClick = () => {
    setShowCreateProject(true);
  };

  const handleCancelCreateProject = () => {
    setShowCreateProject(false);
  };

  const handleCreateProject = () => {
    // Logic to create a new project and add to the list
    setShowCreateProject(false);
  };

  return (
    <Container>
      <Header as="h1" textAlign="center">
        My Projects
      </Header>
      <div className="filter-buttons">
        <Button onClick={() => handleFilterChange("All")}>All</Button>
        <Button onClick={() => handleFilterChange("Pending")}>Pending</Button>
        <Button onClick={() => handleFilterChange("Complete")}>Complete</Button>
        <Button onClick={() => handleFilterChange("In Progress")}>
          In Progress
        </Button>
      </div>
      {!showCreateProject ? (
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
                  <span className="date">Start Date: {project.start_date}</span>
                  <span className="date">End Date: {project.end_date}</span>
                </Card.Meta>
                <Card.Description>{project.description}</Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
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

export default ProjectPage;
