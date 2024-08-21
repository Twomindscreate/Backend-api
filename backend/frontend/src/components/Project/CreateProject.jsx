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
    error,
    handleCreateProject,
    handleFetchProjects,
    handleUpdateProject,
    handleDeleteProject,
  } = useProjectCRUD();

  const { teams = [], handleFetchTeams } = useTeamCRUD();

  const [open, setOpen] = useState(false);
  const [projectForm, setProjectForm] = useState({
    name: "",
    description: "",
    team: "",
    start_date: "",
    end_date: "",
  });
  const [editingProject, setEditingProject] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCreateProject, setShowCreateProject] = useState(false); // Add this line

  useEffect(() => {
    const fetchData = async () => {
      try {
        await handleFetchProjects();
        await handleFetchTeams();
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e, { name, value }) => {
    setProjectForm({
      ...projectForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      if (editingProject) {
        await handleUpdateProject(editingProject.id, projectForm);
      } else {
        await handleCreateProject(projectForm);
      }
      setOpen(false);
      setProjectForm({
        name: "",
        description: "",
        team: "",
        start_date: "",
        end_date: "",
      });
      setEditingProject(null);
      await handleFetchProjects();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
      setShowCreateProject(false); // Updated this line
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.error("Cannot delete project with undefined ID");
      return;
    }
    try {
      await handleDeleteProject(id);
      await handleFetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const teamOptions = teams.map((team) => ({
    key: team.id,
    text: team.name,
    value: team.id,
  }));

  const handleCreateProjectClick = () => {
    setShowCreateProject(true);
  };

  const handleCancelCreateProject = () => {
    setShowCreateProject(false);
    setProjectForm({
      name: "",
      description: "",
      team: "",
      start_date: "",
      end_date: "",
    });
    setEditingProject(null);
  };

  return (
    <Container>
      {!showCreateProject ? (
        <>
          <Header as="h1" textAlign="center">
            My Projects
          </Header>
          <Button onClick={handleCreateProjectClick}>Create New Project</Button>

          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error loading projects: {error}</div>
          ) : (
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
              {projects.length > 0 ? (
                projects.map((project) => (
                  <Card className="project-card" key={project.id}>
                    <Card.Content>
                      <Card.Header>{project.name}</Card.Header>
                      <Card.Meta>
                        <span className="date">
                          Start Date: {project.start_date}
                        </span>
                        <span className="date">
                          End Date: {project.end_date || "N/A"}
                        </span>
                      </Card.Meta>
                      <Card.Description>{project.description}</Card.Description>
                      <Button
                        onClick={() => setEditingProject(project)}
                        primary
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(project.id)}
                        color="red"
                      >
                        Delete
                      </Button>
                    </Card.Content>
                  </Card>
                ))
              ) : (
                <Card className="no-projects-card">
                  <Card.Content>No projects available</Card.Content>
                </Card>
              )}
            </Card.Group>
          )}
        </>
      ) : (
        <Grid stackable>
          <Grid.Row>
            <Grid.Column computer={8} tablet={16} mobile={16}>
              <img src={projectimg} alt="Project" className="project-image" />
            </Grid.Column>
            <Grid.Column computer={8} tablet={16} mobile={16}>
              <div className="create-project-form">
                <Form onSubmit={handleSubmit}>
                  <Form.Input
                    label="Project Name"
                    placeholder="Project Name"
                    name="name"
                    value={projectForm.name}
                    onChange={handleChange}
                    required
                  />
                  <Form.TextArea
                    label="Description"
                    placeholder="Project Description"
                    name="description"
                    value={projectForm.description}
                    onChange={handleChange}
                    required
                  />
                  <Form.Dropdown
                    label="Team"
                    placeholder="Select Team"
                    fluid
                    selection
                    options={teamOptions}
                    name="team"
                    value={projectForm.team}
                    onChange={handleChange}
                    required
                  />
                  <Form.Input
                    type="date"
                    label="Start Date"
                    name="start_date"
                    value={projectForm.start_date}
                    onChange={handleChange}
                    required
                  />
                  <Form.Input
                    type="date"
                    label="End Date"
                    name="end_date"
                    value={projectForm.end_date}
                    onChange={handleChange}
                  />
                  <Button type="submit" primary loading={isSubmitting}>
                    {editingProject ? "Update Project" : "Create Project"}
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

export default React.memo(CreateProject);
