import axios from './axiosConfig';

export const fetchProjects = () => axios.get('projects/');
export const createProject = (data) => axios.post('projects/', data);
export const fetchProjectDetail = (id) => axios.get(projects/${id}/);
export const updateProject = (id, data) => axios.put(projects/${id}/, data);
export const deleteProject = (id) => axios.delete(projects/${id}/);