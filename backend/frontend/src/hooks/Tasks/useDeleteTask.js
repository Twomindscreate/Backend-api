import { useState } from "react";
import { deleteTask } from "../api/userService";

export const useDeleteTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteExistingTask = async (id) => {
    setLoading(true);
    try {
      await deleteTask(id);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to delete task");
      setLoading(false);
    }
  };

  return { deleteExistingTask, loading, error };
};
