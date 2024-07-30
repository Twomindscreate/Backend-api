import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState(null);

  const handleFetchTasks = async () => {
    const response = await axios.get('/api/tasks');
    setTasks(response.data);
  };

  const handleFetchTaskDetail = async (id) => {
    const response = await axios.get(/api/tasks/${id});
    setTask(response.data);
  };

  const handleCreateTask = async (data) => {
    const response = await axios.post('/api/tasks', data);
    setTasks((prevTasks) => [...prevTasks, response.data]);
  };

  const handleUpdateTask = async (id, data) => {
    const response = await axios.put(/api/tasks/${id}, data);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? response.data : task
      )
    );
  };

  const handleDeleteTask = async (id) => {
    await axios.delete(/api/tasks/${id});
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, task, handleFetchTasks,
        handleFetchTaskDetail,
        handleCreateTask,
        handleUpdateTask,
        handleDeleteTask
      }}>
        {children}
      </TaskContext.Provider>
    );
    };
    
    export const useTask = () => useContext(TaskContext);