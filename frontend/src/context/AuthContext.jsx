import React, { createContext, useState, useEffect } from 'react';
import { fetchCurrentUser, loginUser, registerUser } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('learnpath_token');
      if (token) {
        try {
          const currentUser = await fetchCurrentUser();
          setUser(currentUser);
        } catch (err) {
          console.error('Failed to restore session:', err);
          localStorage.removeItem('learnpath_token');
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (credentials) => {
    const data = await loginUser(credentials);
    localStorage.setItem('learnpath_token', data.token);
    setUser(data.user);
    return data;
  };

  const register = async (userData) => {
    const data = await registerUser(userData);
    localStorage.setItem('learnpath_token', data.token);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('learnpath_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
