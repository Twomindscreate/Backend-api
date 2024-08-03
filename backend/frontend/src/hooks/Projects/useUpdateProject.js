import { useState } from "react";
import { updateProject } from "../api/userService";

export const useUpdateProject = (id) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateExistingProject = async (data) => {
    setLoading(true);
    try {
      await updateProject(id, data);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to update project");
      setLoading(false);
    }
  };

  return { updateExistingProject, loading, error };
};
