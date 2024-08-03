import { useState } from "react";
import { createProject } from "../api/userService";

export const useCreateProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createNewProject = async (data) => {
    setLoading(true);
    try {
      await createProject(data);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to create project");
      setLoading(false);
    }
  };

  return { createNewProject, loading, error };
};
