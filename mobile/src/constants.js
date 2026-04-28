import { Platform } from 'react-native';

// App-wide constants
export const COLORS = {
  primary: '#6200ee',
  accent: '#03dac4',
  background: '#f6f6f6',
  surface: '#fff',
  error: '#B00020',
  text: '#222',
  disabled: '#aaa',
};

export const CATEGORIES = [
  'Food',
  'Transport',
  'Shopping',
  'Bills',
  'Health',
  'Entertainment',
  'Other',
];

const getApiHost = () => {
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    return window.location.hostname || 'localhost';
  }

  if (Platform.OS === 'android') {
    return '10.0.2.2';
  }

  return 'localhost';
};

export const API_BASE_URL = `http://${getApiHost()}:5000/api`;
