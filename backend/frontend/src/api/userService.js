import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://127.0.0.1:8000/api/";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Utility functions for token handling
const getTokenExpirationDate = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp === undefined) return null;

    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(decodedToken.exp);

    return expirationDate;
  } catch (e) {
    return null;
  }
};

const isTokenExpired = (token) => {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
};

// Refresh token function
const refreshToken = async () => {
  try {
    const response = await api.post("refresh-token/");
    localStorage.setItem("accessToken", response.data.access);
    return response.data.access;
  } catch (error) {
    console.error("Token refresh failed", error);
    window.location.href = "/login"; // Redirect to login on refresh failure
  }
};

// Axios request interceptor to handle token expiration and refreshing
api.interceptors.request.use(async (config) => {
  let token = localStorage.getItem("accessToken");
  if (token && isTokenExpired(token)) {
    token = await refreshToken(); // Refresh token if expired
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API functions
export const loginUser = (data) => api.post("login/", data);
export const registerUser = (data) => api.post("register/", data);
export const createProfile = (data) => api.post("profile/", data);
export const updateProfile = (id, data) => api.put(`profile/${id}/`, data);
export const getProfile = () => api.get("profile/");
export const getTeams = () => api.get("teams/");
export const createTeam = (data) => api.post("teams/", data);
export const updateTeam = (id, data) => api.put(`teams/${id}/`, data);
export const deleteTeam = (id) => api.delete(`teams/${id}/`);
export const getMembers = () => api.get("members/");
export const createMember = (data) => api.post("members/", data);
export const updateMember = (id, data) => api.put(`members/${id}/`, data);
export const deleteMember = (id) => api.delete(`members/${id}/`);
export const getProjects = () => api.get("projects/");
export const createProject = (data) => api.post("projects/", data);
export const updateProject = (id, data) => api.put(`projects/${id}/`, data);
export const deleteProject = (id) => api.delete(`projects/${id}/`);
export const getTasks = () => api.get("tasks/");
export const createTask = (data) => api.post("tasks/", data);
export const updateTask = (id, data) => api.put(`tasks/${id}/`, data);
export const deleteTask = (id) => api.delete(`tasks/${id}/`);

export default api;
