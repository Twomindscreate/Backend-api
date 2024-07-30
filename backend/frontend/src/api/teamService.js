import axios from './axiosConfig';

export const fetchTeams = () => axios.get('teams/');
export const createTeam = (data) => axios.post('teams/', data);
export const fetchTeamDetail = (id) => axios.get(teams/${id}/);
export const updateTeam = (id, data) => axios.put(teams/${id}/, data);
export const deleteTeam = (id) => axios.delete(teams/${id}/);