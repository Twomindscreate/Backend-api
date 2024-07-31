import BASE_URL from "./url";
import axios from "axios";

const api = axios.create({
  baseURL: BASE_URL,
});

export const registerUser = (userData) => {
  return api.post("/register/", userData);
};

export const loginUser = (userData) => {
  return api.post("/login/", userData);
};
