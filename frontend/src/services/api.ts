// import axios, { AxiosInstance, AxiosError } from 'axios';
// import { useAuthStore } from '@/store';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// // Create axios instance
// const api: AxiosInstance = axios.create({
//   baseURL: `${API_URL}/api`,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   timeout: 10000,
// });

// // Request interceptor to add auth token
// api.interceptors.request.use(
//   (config) => {
//     const token = useAuthStore.getState().token;
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor for error handling
// api.interceptors.response.use(
//   (response) => response,
//   (error: AxiosError) => {
//     if (error.response?.status === 401) {
//       // Token expired or invalid
//       useAuthStore.getState().logout();
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;
// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:8080',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export default api;
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
