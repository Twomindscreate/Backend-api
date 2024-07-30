import React, { useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import { useProject } from '../../hooks/useProject';
import { Link } from 'react-router-dom';

const ProjectList = () => {
  const { projects, handleFetchProjects, handleDeleteProject } = useProject();

  useEffect(() => {
    handleFetchProjects();
  }, []);

  return (
    <div className="project-list">
      <h2>Projects</h2>
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>
                <Link to={/project/${project.id}} className="btn btn-info">
                  Details
                </Link>
                <Button color="danger" onClick={() => handleDeleteProject(project.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link to="/project/create" className="btn btn-primary">
        Create Project
      </Link>
    </div>
  );
};

export default ProjectList;