import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
});

// Interceptor to inject JWT Authorization Token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('learnpath_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;
