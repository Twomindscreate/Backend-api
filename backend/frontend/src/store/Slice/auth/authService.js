import AxiosInstance from "../../../Api/AxiosInstance";

const BACKEND_DOMAIN = "http://127.0.0.1:8000";
// const BACKEND_DOMAIN = "http://localhost:8000";
const API_SERVICE = "api/v1/auth";

const REGISTER_URL = `${BACKEND_DOMAIN}/${API_SERVICE}/users/`;
const LOGIN_URL = `${BACKEND_DOMAIN}/${API_SERVICE}/jwt/create/`;
const ACTIVATE_URL = `${BACKEND_DOMAIN}/${API_SERVICE}/users/activation/`;
const RESET_PASSWORD_URL = `${BACKEND_DOMAIN}/${API_SERVICE}/users/reset_password/`;
const RESET_PASSWORD_CONFIRM_URL = `${BACKEND_DOMAIN}/${API_SERVICE}/users/reset_password_confirm/`;
const GET_USER_INFO = `${BACKEND_DOMAIN}/${API_SERVICE}/users/me/`;
// Register user
const config = {
  headers: {
    "Content-type": "application/json",
  },
};
// const register = async (userData) => {
//   const response = await axios.post(REGISTER_URL, userData, config);
//   return response.data;
// };

const login = async (userData) => {
  const { data } = await AxiosInstance.post("login/", userData, config);
  if (data) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("token", JSON.stringify(data.access_token));
    localStorage.setItem("refresh_token", JSON.stringify(data.refresh_token));
    const user = data.full_name;
    localStorage.setItem("user", JSON.stringify(user)); // Save user info
  }
  return data;
};

const logout = async () => {
  const refresh = JSON.parse(localStorage.getItem("refresh_token"));
  const { data } = await AxiosInstance.post("logout/", {
    refresh_token: refresh,
  });
  return data;
};

//Activate user

// const activate = async (userData) => {
//   const response = await axios.post(ACTIVATE_URL, userData, config);
//   return response.data;
// };

// reset password
// const resetPassword = async (userData) => {
//   const response = await axios.post(RESET_PASSWORD_URL, userData, config);
//   return response.data;
// };

// reset password
// const resetPasswordConfirm = async (userData) => {
//   const response = await axios.post(
//     RESET_PASSWORD_CONFIRM_URL,
//     userData,
//     config
//   );
//   return response.data;
// };

// get user info
// const getUserInfo = async (accessToken) => {
//   config.headers = {
//     Authorization: `Bearer ${accessToken}`,
//   };
//   const response = await axios.get(GET_USER_INFO, config);
//   return response.data;
// };

const authService = {
  // register,
  login,
  logout,
  // activate,
  // resetPassword,
  // resetPasswordConfirm,
  // getUserInfo,
};

export default authService;
