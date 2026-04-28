import React, { createContext, useContext, useReducer } from 'react';
import api from '../api';
import { AuthContext } from './AuthContext';

const initialState = {
  expenses: [],
  loading: false,
  error: null,
  summary: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_EXPENSES':
      return { ...state, expenses: action.payload, loading: false, error: null };
    case 'SET_LOADING':
      return { ...state, loading: true };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_SUMMARY':
      return { ...state, summary: action.payload, loading: false, error: null };
    default:
      return state;
  }
}

export const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { accessToken } = useContext(AuthContext);

  const authConfig = accessToken
    ? { headers: { Authorization: `Bearer ${accessToken}` } }
    : {};

  const fetchExpenses = async () => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const res = await api.get('/expenses', authConfig);
      dispatch({ type: 'SET_EXPENSES', payload: res.data });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
    }
  };

  const fetchSummary = async () => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const res = await api.get('/expenses/summary', authConfig);
      dispatch({ type: 'SET_SUMMARY', payload: res.data });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
    }
  };

  const createExpense = async (payload) => {
    await api.post('/expenses', payload, authConfig);
    await Promise.all([fetchExpenses(), fetchSummary()]);
  };

  const updateExpense = async (expenseId, payload) => {
    await api.put(`/expenses/${expenseId}`, payload, authConfig);
    await Promise.all([fetchExpenses(), fetchSummary()]);
  };

  const deleteExpense = async (expenseId) => {
    await api.delete(`/expenses/${expenseId}`, authConfig);
    await Promise.all([fetchExpenses(), fetchSummary()]);
  };

  return (
    <ExpenseContext.Provider
      value={{ ...state, fetchExpenses, fetchSummary, createExpense, updateExpense, deleteExpense }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}
