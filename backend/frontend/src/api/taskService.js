import axios from './axiosConfig';

export const fetchTasks = () => axios.get('tasks/');
export const createTask = (data) => axios.post('tasks/', data);
export const fetchTaskDetail = (id) => axios.get(tasks/${id}/);
export const updateTask = (id, data) => axios.put(tasks/${id}/, data);
export const deleteTask = (id) => axios.delete(tasks/${id}/);