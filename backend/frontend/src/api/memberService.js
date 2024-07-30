import axios from './axiosConfig';

export const fetchMembers = () => axios.get('members/');
export const createMember = (data) => axios.post('members/', data);
export const fetchMemberDetail = (id) => axios.get(members/${id}/);
export const updateMember = (id, data) => axios.put(members/${id}/, data);
export const deleteMember = (id) => axios.delete(members/${id}/);