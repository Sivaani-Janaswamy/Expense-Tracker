import axios from 'axios';
import { API_BASE_URL } from './constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

let accessTokenCache = null;
let refreshTokenCache = null;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export function setSessionTokens({ accessToken, refreshToken }) {
  accessTokenCache = accessToken || null;
  refreshTokenCache = refreshToken || null;
}

// Attach JWT token if present
api.interceptors.request.use(async (config) => {
  const token = accessTokenCache || await AsyncStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors (token expired)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      const refreshToken = refreshTokenCache || await AsyncStorage.getItem('refreshToken');
      if (!refreshToken) {
        setSessionTokens({ accessToken: null, refreshToken: null });
        await AsyncStorage.multiRemove(['user', 'accessToken', 'refreshToken']);
        return Promise.reject(error);
      }

      try {
        const refreshResponse = await axios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken });
        const newAccessToken = refreshResponse.data.accessToken;

        setSessionTokens({ accessToken: newAccessToken, refreshToken });
        await AsyncStorage.setItem('accessToken', newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        setSessionTokens({ accessToken: null, refreshToken: null });
        await AsyncStorage.multiRemove(['user', 'accessToken', 'refreshToken']);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
