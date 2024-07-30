import axios from './axiosConfig';

export const createProfile = (data) => axios.post('profile/', data);
export const updateProfile = (id, data) => axios.put(profile/${id}/, data);