import * as yup from 'yup';
import { CATEGORIES } from './constants';

const getLocalDateString = () => {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
};

export const loginSchema = yup.object({
  email: yup.string().trim().email('Enter a valid email address').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export const registerSchema = yup.object({
  name: yup.string().trim().min(2, 'Name must be at least 2 characters').required('Name is required'),
  email: yup.string().trim().email('Enter a valid email address').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm your password'),
});

export const expenseSchema = yup.object({
  amount: yup
    .number()
    .typeError('Amount must be a number')
    .positive('Amount must be greater than 0')
    .required('Amount is required'),
  category: yup.string().oneOf(CATEGORIES, 'Choose a valid category').required('Category is required'),
  date: yup
    .string()
    .required('Date is required')
    .test('not-in-future', 'Date cannot be in the future', (value) => {
      if (!value) return false;
      return value <= getLocalDateString();
    }),
  note: yup.string().max(200, 'Note must be 200 characters or less').nullable(),
});
