import axios from './axiosConfig';

export const register = (data) => axios.post('register/', data);
export const login = (data) => axios.post('login/', data);