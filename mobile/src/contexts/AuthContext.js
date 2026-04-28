import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api, { setSessionTokens } from '../api';

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: true,
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        loading: false,
      };
    case 'LOGOUT':
      return { ...state, user: null, accessToken: null, refreshToken: null, loading: false };
    case 'RESTORE':
      return { ...state, ...action.payload, loading: false };
    default:
      return state;
  }
}

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const restore = async () => {
      const user = await AsyncStorage.getItem('user');
      const accessToken = await AsyncStorage.getItem('accessToken');
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      if (user && accessToken) {
        setSessionTokens({ accessToken, refreshToken });
        dispatch({ type: 'RESTORE', payload: { user: JSON.parse(user), accessToken, refreshToken } });
      } else {
        setSessionTokens({ accessToken: null, refreshToken: null });
        dispatch({ type: 'RESTORE', payload: { user: null, accessToken: null, refreshToken: null } });
      }
    };
    restore();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
    await AsyncStorage.setItem('accessToken', res.data.accessToken);
    await AsyncStorage.setItem('refreshToken', res.data.refreshToken);
    setSessionTokens({ accessToken: res.data.accessToken, refreshToken: res.data.refreshToken });
    dispatch({
      type: 'LOGIN',
      payload: {
        user: res.data.user,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      },
    });
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(['user', 'accessToken', 'refreshToken']);
    setSessionTokens({ accessToken: null, refreshToken: null });
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
