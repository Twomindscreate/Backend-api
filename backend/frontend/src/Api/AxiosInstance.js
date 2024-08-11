import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Correct import
import dayjs from "dayjs";

// Function to safely retrieve and parse JSON from localStorage
const getTokenFromStorage = (key) => {
  const storedToken = localStorage.getItem(key);
  if (storedToken && storedToken !== "undefined") {
    try {
      return JSON.parse(storedToken);
    } catch (error) {
      console.error("Failed to parse token from storage:", error);
      return "";
    }
  }
  return "";
};

// Retrieve tokens from localStorage
let accessToken = getTokenFromStorage("token");
let refreshToken = getTokenFromStorage("refresh_token");

const baseURL = "http://localhost:8000/api/";

// Create Axios instance
const AxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: accessToken ? `Bearer ${accessToken}` : "",
  },
});

AxiosInstance.interceptors.request.use(
  async (req) => {
    console.log("Request intercepted:", req);

    if (accessToken) {
      const user = jwtDecode(accessToken);
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

      if (!isExpired) {
        req.headers.Authorization = `Bearer ${accessToken}`;
        return req;
      }

      try {
        console.log("Access token expired, attempting to refresh...");
        const response = await axios.post(`${baseURL}token/refresh/`, {
          refresh: refreshToken,
        });

        if (response.data.access) {
          const newAccessToken = response.data.access;
          localStorage.setItem("token", JSON.stringify(newAccessToken));
          req.headers.Authorization = `Bearer ${newAccessToken}`;
          accessToken = newAccessToken;
          console.log("Token refreshed successfully");
          return req;
        } else {
          throw new Error("Invalid refresh response structure");
        }
      } catch (error) {
        console.error("Token refresh failed:", error.response || error.message);
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    return req;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Interceptor to handle responses
AxiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response received:", response);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("Response error:", error.response.data);
    } else {
      console.error("Network or other error:", error.message);
    }
    return Promise.reject(error);
  }
);

// Example of a function using AxiosInstance
const getSomeData = async () => {
  try {
    const response = await AxiosInstance.get("some-endpoint/");
    console.log("Data received:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
};

export default AxiosInstance;
