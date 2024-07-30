import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState(null);

  const handleFetchProjects = async () => {
    const response = await axios.get('/api/projects');
    setProjects(response.data);
  };

  const handleFetchProjectDetail = async (id) => {
    const response = await axios.get(/api/projects/${id});
    setProject(response.data);
  };

  const handleCreateProject = async (data) => {
    const response = await axios.post('/api/projects', data);
    setProjects((prevProjects) => [...prevProjects, response.data]);
  };

  const handleUpdateProject = async (id, data) => {
    const response = await axios.put(/api/projects/${id}, data);
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === id ? response.data : project
      )
    );
  };

  const handleDeleteProject = async (id) => {
    await axios.delete(/api/projects/${id});
    setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
  };

  return (
    <ProjectContext.Provider value={{ projects, project, handleFetchProjects, handleFetchProjectDetail, handleCreateProject, handleUpdateProject, handleDeleteProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);