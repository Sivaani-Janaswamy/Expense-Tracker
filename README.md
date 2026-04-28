# Expense Tracker App

Full-stack expense tracking app built with React Native (Expo), Node.js, Express, and MongoDB.

## What It Includes

- JWT authentication with register, login, persisted session, and access-token refresh
- Expense CRUD: add, edit, delete, and list personal expenses
- Dashboard with category-wise spending summary
- React Navigation with auth flow and bottom tabs
- Context API + `useReducer` state management
- Loading, empty, retry, and offline status handling
- Express REST API with MongoDB + Mongoose

## Project Structure

```text
ExpenseTracker/
  backend/   Express API + MongoDB models
  mobile/    React Native Expo app
```

## Backend Setup

1. Open `backend/.env` and provide real values:

```env
MONGO_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=replace_with_a_secure_random_string
```

2. Install dependencies:

```bash
cd backend
npm install
```

3. Start the backend:

```bash
npm run dev
```

The API runs on `http://localhost:5000`.

## Mobile Setup

1. Install dependencies:

```bash
cd mobile
npm install
```

2. Start Expo:

```bash
npx expo start
```

3. Run on:

- Web: press `w`
- Android emulator: press `a`
- iOS simulator: press `i`
- Physical device: scan the QR code in Expo Go

## API Base URL Notes

The mobile app resolves the backend like this:

- Web: current browser hostname on port `5000`
- Android emulator: `10.0.2.2:5000`
- iOS simulator / local desktop web: `localhost:5000`

If you run the backend on a different machine, update [`mobile/src/constants.js`](C:/Users/sivaa/MyFiles/vsc/major_projects/ExpenseTracker/mobile/src/constants.js).

## Core Screens

- Login / Register
- Dashboard
- Expenses list
- Add expense
- Edit expense
- Profile / Logout

## Backend Endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`

### Expenses

- `GET /api/expenses`
- `GET /api/expenses/summary`
- `GET /api/expenses/:id`
- `POST /api/expenses`
- `PUT /api/expenses/:id`
- `DELETE /api/expenses/:id`

## Submission Notes

This project is structured to match the usual evaluation criteria for:

- React Native navigation and screen composition
- State management with Context API
- Async API integration with Axios
- Handling edge cases such as empty data, invalid forms, expired tokens, and offline state
- Readable backend/mobile separation

## Current Limitation

The repo will not run end-to-end until `backend/.env` contains a valid MongoDB connection string. The current local `.env` in this workspace is not using a valid MongoDB URI format.
