import { useState } from "react";
import { deleteProject } from "../api/userService";

export const useDeleteProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteExistingProject = async (id) => {
    setLoading(true);
    try {
      await deleteProject(id);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to delete project");
      setLoading(false);
    }
  };

  return { deleteExistingProject, loading, error };
};
