import { useState } from 'react';
import {
  fetchTasks,
  createTask,
  fetchTaskDetail,
  updateTask,
  deleteTask,
} from '../api/taskService';

export const useTask = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState(null);

  const handleFetchTasks = async () => {
    try {
      const response = await fetchTasks();
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateTask = async (data) => {
    try {
      const response = await createTask(data);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFetchTaskDetail = async (id) => {
    try {
      const response = await fetchTaskDetail(id);
      setTask(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateTask = async (id, data) => {
    try {
      const response = await updateTask(id, data);
      setTask(response.data);
      setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return {
    tasks,
    task,
    handleFetchTasks,
    handleCreateTask,
    handleFetchTaskDetail,
    handleUpdateTask,
    handleDeleteTask,
  };
};