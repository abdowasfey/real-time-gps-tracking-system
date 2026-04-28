import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

// إضافة التوكن تلقائياً لكل طلب
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log("requesttttttttttt ", token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;