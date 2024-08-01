// // src/context/ProfileContext.js
// import React, { createContext, useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { AuthContext } from "./AuthContext";

// export const ProfileContext = createContext();

// export const ProfileProvider = ({ children }) => {
//   const [profile, setProfile] = useState(null);
//   const { auth } = useContext(AuthContext);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       if (auth.isAuthenticated) {
//         try {
//           const response = await axios.get("/api/auth/profile", {
//             headers: { Authorization: `Bearer ${auth.user.token}` },
//           });
//           setProfile(response.data);
//         } catch (error) {
//           console.error("Failed to fetch profile", error);
//         }
//       }
//     };

//     fetchProfile();
//   }, [auth]);

//   return (
//     <ProfileContext.Provider value={{ profile }}>
//       {children}
//     </ProfileContext.Provider>
//   );
// };
// src/context/ProfileContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    try {
      const response = await axios.get("/api/profile");
      setProfile(response.data);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, fetchProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
