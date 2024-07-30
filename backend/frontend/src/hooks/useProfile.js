import { useState } from 'react';
import { createProfile, updateProfile } from '../api/profileService';

export const useProfile = () => {
  const [profile, setProfile] = useState(null);

  const handleCreateProfile = async (data) => {
    try {
      const response = await createProfile(data);
      setProfile(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateProfile = async (id, data) => {
    try {
      const response = await updateProfile(id, data);
      setProfile(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return { profile, handleCreateProfile, handleUpdateProfile };
};