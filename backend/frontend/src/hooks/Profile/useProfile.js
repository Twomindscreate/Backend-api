import { useState, useEffect } from "react";
import { createProfile, updateProfile } from "../api/userService"; // Ensure to import from the correct file
import api from "../api/apiService"; // Ensure to import the configured API instance

const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
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

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleCreateProfile = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await createProfile(data);
      await fetchProfile(); // Refresh the profile after creation
    } catch (err) {
      if (err.response && err.response.status === 401) {
        // Handle unauthorized error
        setError("Session expired. Please log in again.");
      } else {
        setError(err.message || "Failed to create profile");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      await updateProfile(id, data);
      await fetchProfile(); // Refresh the profile after update
    } catch (err) {
      if (err.response && err.response.status === 401) {
        // Handle unauthorized error
        setError("Session expired. Please log in again.");
      } else {
        setError(err.message || "Failed to update profile");
      }
    } finally {
      setLoading(false);
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
