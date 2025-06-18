import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

export const register = (data) => API.post('auth/register/', data);
export const login = (data) => API.post('auth/jwt/create/', data);
export const getPendingUsers = () => API.get('users/pending/');
export const approveUser = (userId) => API.patch(`users/${userId}/approve/`);


API.interceptors.request.use((config) => {
  const token = localStorage.getItem('access');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
