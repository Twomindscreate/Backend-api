import { useState } from "react";
import { createTask } from "../api/userService";

export const useCreateTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createNewTask = async (data) => {
    setLoading(true);
    try {
      await createTask(data);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to create task");
      setLoading(false);
    }
  };

  return { createNewTask, loading, error };
};
