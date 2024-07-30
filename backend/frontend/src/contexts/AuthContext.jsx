import React, { createContext, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const history = useHistory();

  const handleRegister = async (data) => {
    const response = await axios.post('/api/register', data);
    setUser(response.data);
    history.push('/');
  };

  const handleLogin = async (data) => {
    const response = await axios.post('/api/login', data);
    setUser(response.data);
    history.push('/');
  };

  const handleLogout = async () => {
    await axios.post('/api/logout');
    setUser(null);
    history.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, handleRegister, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);