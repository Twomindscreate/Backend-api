// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import AxiosInstance from "../Api/AxiosInstance";
// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState({ user: null, isAuthenticated: false });
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkAuth = async () => {
//       const token = localStorage.getItem("accessToken");
//       if (token) {
//         try {
//           const response = await axios.get("profile/", {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           setAuth({ user: response.data, isAuthenticated: true });
//         } catch (error) {
//           localStorage.removeItem("accessToken");
//           setAuth({ user: null, isAuthenticated: false });
//         }
//       }
//     };

//     checkAuth();
//   }, []);

//   const login = async (credentials) => {
//     const response = await AxiosInstance.post("login/", credentials);
//     localStorage.setItem("accessToken", response.data.token);
//     setAuth({ user: response.data.user, isAuthenticated: true });
//     navigate("/dashboard");
//   };

//   const logout = () => {
//     localStorage.removeItem("accessToken");
//     setAuth({ user: null, isAuthenticated: false });
//     navigate("/login");
//   };

//   return (
//     <AuthContext.Provider value={{ auth, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
