import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Fixed import
import dayjs from "dayjs";

const baseURL = "http://localhost:8000/api/";

const getAccessToken = () => {
  const token = localStorage.getItem("token");
  return token ? JSON.parse(token) : null;
};

const getRefreshToken = () => {
  const refreshToken = localStorage.getItem("refresh_token");
  return refreshToken ? JSON.parse(refreshToken) : null;
};

const AxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setupAxiosInterceptors = (navigate) => {
  AxiosInstance.interceptors.request.use(
    async (req) => {
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();

      if (accessToken) {
        const user = jwtDecode(accessToken);
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if (!isExpired) {
          req.headers.Authorization = `Bearer ${accessToken}`;
          return req;
        }

        try {
          const response = await axios.post(`${baseURL}token/refresh/`, {
            refresh: refreshToken,
          });

          const newAccessToken = response.data.access;
          localStorage.setItem("token", JSON.stringify(newAccessToken));
          req.headers.Authorization = `Bearer ${newAccessToken}`;
          return req;
        } catch (error) {
          localStorage.removeItem("token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("user");
          navigate("/login");
          return Promise.reject(error);
        }
      }

      return req;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default AxiosInstance;
