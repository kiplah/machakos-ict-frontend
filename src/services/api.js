import axios from 'axios';

// 🔐 Authenticated Axios instance
const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

// Automatically attach token to all protected requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('access');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🌐 Public Axios instance (NO token)
const PUBLIC_API = axios.create({
  baseURL: 'https://machakos-ict-system.onrender.com/api/',
});

// 📌 Public endpoints (no token required)
export const register = (data) => PUBLIC_API.post('auth/register/', data);
export const login = (data) => PUBLIC_API.post('auth/jwt/create/', data);

// 🔐 Protected endpoints
export const getPendingUsers = () => API.get('users/pending/');
export const approveUser = (userId) => API.patch(`users/${userId}/approve/`);

export const getApprovedUsers = () => API.get('users/approved/');

export default API;
