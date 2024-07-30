import { useState } from 'react';
import { register, login } from '../api/userService';

export const useAuth = () => {
  const [user, setUser] = useState(null);

  const handleRegister = async (data) => {
    try {
      const response = await register(data);
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async (data) => {
    try {
      const response = await login(data);
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return { user, handleRegister, handleLogin };
};