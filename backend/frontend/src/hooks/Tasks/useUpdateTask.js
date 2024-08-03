import { useState } from "react";
import { updateTask } from "../api/userService";

export const useUpdateTask = (id) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateExistingTask = async (data) => {
    setLoading(true);
    try {
      await updateTask(id, data);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to update task");
      setLoading(false);
    }
  };

  return { updateExistingTask, loading, error };
};
