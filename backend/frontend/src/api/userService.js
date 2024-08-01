import BASE_URL from "./url";
import axios from "axios";

const api = axios.create({
  baseURL: BASE_URL,
});

const token = localStorage.get("access");
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export const registerUser = (userData) => {
  return api.post("/register/", userData);
};

export const loginUser = (userData) => {
  return api.post("/login/", userData);
};

// import httpService from "../utils/httpService";

// export const registerUser = (userData) => {
//   return httpService("post", "/register/", userData);
// };

// export const loginUser = (userData) => {
//   return httpService("/login/", "post", userData);
// };
