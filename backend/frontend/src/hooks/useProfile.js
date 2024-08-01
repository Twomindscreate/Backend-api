// import { useState, useEffect } from "react";
// import { createProfile, updateProfile } from "../api/api";

// const useProfile = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       setLoading(true);
//       try {
//         const response = await api.get("profile/", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//           },
//         });
//         setProfile(response.data);
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleCreateProfile = async (data) => {
//     try {
//       await createProfile(data);
//       // Fetch or update profile state after creation
//       const response = await api.get("profile/", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         },
//       });
//       setProfile(response.data);
//     } catch (err) {
//       setError(err);
//     }
//   };

//   const handleUpdateProfile = async (id, data) => {
//     try {
//       await updateProfile(id, data);
//       // Fetch or update profile state after update
//       const response = await api.get("profile/", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         },
//       });
//       setProfile(response.data);
//     } catch (err) {
//       setError(err);
//     }
//   };

//   return {
//     profile,
//     loading,
//     error,
//     handleCreateProfile,
//     handleUpdateProfile,
//   };
// };

// export default useProfile;

import { useState, useEffect } from "react";
import { createProfile, updateProfile } from "../api/userService";
import api from "../api/userService"; // Ensure to import the configured API instance

const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await api.get("profile/");
        setProfile(response.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          // Handle unauthorized error, possibly refresh the token
          setError("Session expired. Please log in again.");
        } else {
          setError(err.message || "Failed to fetch profile");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleCreateProfile = async (data) => {
    try {
      await createProfile(data);
      // Fetch or update profile state after creation
      const response = await api.get("profile/");
      setProfile(response.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        // Handle unauthorized error
        setError("Session expired. Please log in again.");
      } else {
        setError(err.message || "Failed to create profile");
      }
    }
  };

  const handleUpdateProfile = async (id, data) => {
    try {
      await updateProfile(id, data);
      // Fetch or update profile state after update
      const response = await api.get("profile/");
      setProfile(response.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        // Handle unauthorized error
        setError("Session expired. Please log in again.");
      } else {
        setError(err.message || "Failed to update profile");
      }
    }
  };

  return {
    profile,
    loading,
    error,
    handleCreateProfile,
    handleUpdateProfile,
  };
};

export default useProfile;
