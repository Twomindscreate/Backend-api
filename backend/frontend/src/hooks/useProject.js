import { useState } from 'react';
import {
  fetchProjects,
  createProject,
  fetchProjectDetail,
  updateProject,
  deleteProject,
} from '../api/projectService';

export const useProject = () => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState(null);

  const handleFetchProjects = async () => {
    try {
      const response = await fetchProjects();
      setProjects(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateProject = async (data) => {
    try {
      const response = await createProject(data);
      setProjects([...projects, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFetchProjectDetail = async (id) => {
    try {
      const response = await fetchProjectDetail(id);
      setProject(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateProject = async (id, data) => {
    try {
      const response = await updateProject(id, data);
      setProject(response.data);
      setProjects(projects.map((project) => (project.id === id ? response.data : project)));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await deleteProject(id);
      setProjects(projects.filter((project) => project.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return {
    projects,
    project,
    handleFetchProjects,
    handleCreateProject,
    handleFetchProjectDetail,
    handleUpdateProject,
    handleDeleteProject,
  };
};