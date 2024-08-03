import { useState, useEffect } from "react";
import { getTasks } from "../api/userService";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (err) {
      setError(err.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, loading, error, fetchTasks };
};

export const useTask = (id) => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTask = async (id) => {
    setLoading(true);
    try {
      const response = await getTasks(); // Adjust if API provides endpoint for single task
      const foundTask = response.data.find((task) => task.id === id);
      setTask(foundTask);
    } catch (err) {
      setError(err.message || "Failed to fetch task");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchTask(id);
  }, [id]);

  return { task, loading, error, fetchTask };
};
