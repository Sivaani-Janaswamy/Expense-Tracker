import axios from 'axios';
import { API_BASE_URL } from './constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Attach JWT token if present
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors (token expired)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Optionally handle token refresh here
      // For now, just remove token and redirect to login
      await AsyncStorage.removeItem('accessToken');
    }
    return Promise.reject(error);
  }
);

export default api;
