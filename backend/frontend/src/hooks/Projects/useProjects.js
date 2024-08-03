import { useState, useEffect } from "react";
import { getProjects } from "../api/userService";

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await getProjects();
      setProjects(response.data);
    } catch (err) {
      setError(err.message || "Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return { projects, loading, error, fetchProjects };
};

export const useProject = (id) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProject = async (id) => {
    setLoading(true);
    try {
      const response = await getProjects(); // Adjust if API provides endpoint for single project
      const foundProject = response.data.find((project) => project.id === id);
      setProject(foundProject);
    } catch (err) {
      setError(err.message || "Failed to fetch project");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchProject(id);
  }, [id]);

  return { project, loading, error, fetchProject };
};
