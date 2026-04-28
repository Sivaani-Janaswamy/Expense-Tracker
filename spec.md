# Expense Tracker — Project Specification

## Overview

A production-grade full-stack mobile expense tracking application built with **React Native** (frontend), **Node.js + Express.js** (backend API), and **MongoDB** (database). The app enables users to register/login, manage personal expenses, and view category-wise summaries on a dashboard.

---

## Tech Stack

| Layer       | Technology                                      |
|-------------|-------------------------------------------------|
| Mobile      | React Native (Expo managed workflow)            |
| Navigation  | React Navigation v6 (Stack + Bottom Tab)        |
| State       | React Context API + useReducer                  |
| HTTP Client | Axios with interceptors                         |
| Auth        | JWT (access + refresh token pattern)            |
| Backend     | Node.js + Express.js                            |
| Database    | MongoDB + Mongoose ODM                          |
| Validation  | express-validator (server), Formik + Yup (RN)  |
| Storage     | AsyncStorage (JWT persistence on device)        |

---

## Project Structure

```
ExpenseTracker/
├── backend/                    # Express.js REST API
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js           # MongoDB connection
│   │   ├── middleware/
│   │   │   ├── auth.js         # JWT verification middleware
│   │   │   └── errorHandler.js # Global error handler
│   │   ├── models/
│   │   │   ├── User.js         # User schema
│   │   │   └── Expense.js      # Expense schema
│   │   ├── routes/
│   │   │   ├── auth.js         # POST /api/auth/register, /login, /refresh
│   │   │   └── expenses.js     # CRUD /api/expenses
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── expenseController.js
│   │   └── app.js              # Express app setup
│   ├── .env.example
│   ├── package.json
│   └── server.js               # Entry point
│
├── mobile/                     # React Native (Expo)
│   ├── src/
│   │   ├── api/
│   │   │   ├── client.js       # Axios instance + interceptors
│   │   │   ├── auth.js         # Auth API calls
│   │   │   └── expenses.js     # Expense API calls
│   │   ├── context/
│   │   │   ├── AuthContext.js  # Auth state + actions
│   │   │   └── ExpenseContext.js # Expense state + actions
│   │   ├── navigation/
│   │   │   ├── AppNavigator.js # Root navigator (auth guard)
│   │   │   ├── AuthStack.js    # Login / Register screens
│   │   │   └── MainTabs.js     # Bottom tab navigator
│   │   ├── screens/
│   │   │   ├── auth/
│   │   │   │   ├── LoginScreen.js
│   │   │   │   └── RegisterScreen.js
│   │   │   ├── dashboard/
│   │   │   │   └── DashboardScreen.js
│   │   │   ├── expenses/
│   │   │   │   ├── ExpenseListScreen.js
│   │   │   │   ├── AddExpenseScreen.js
│   │   │   │   └── EditExpenseScreen.js
│   │   │   └── profile/
│   │   │       └── ProfileScreen.js
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Button.js
│   │   │   │   ├── Input.js
│   │   │   │   ├── LoadingSpinner.js
│   │   │   │   ├── ErrorMessage.js
│   │   │   │   └── EmptyState.js
│   │   │   ├── expense/
│   │   │   │   ├── ExpenseCard.js
│   │   │   │   └── ExpenseForm.js
│   │   │   └── dashboard/
│   │   │       ├── CategorySummaryCard.js
│   │   │       └── SpendingChart.js
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useExpenses.js
│   │   ├── utils/
│   │   │   ├── formatCurrency.js
│   │   │   ├── formatDate.js
│   │   │   └── storage.js      # AsyncStorage helpers
│   │   └── constants/
│   │       ├── colors.js
│   │       ├── categories.js   # Expense category list
│   │       └── api.js          # Base URL constant
│   ├── App.js
│   ├── app.json
│   └── package.json
│
└── README.md
```

---

## Features & Functional Requirements

### 1. Authentication
| Feature         | Details                                                    |
|-----------------|------------------------------------------------------------|
| Register        | Name, email, password — server-side + client-side validation |
| Login           | Email + password → JWT access token + refresh token        |
| Token storage   | AsyncStorage; auto-attach via Axios interceptor            |
| Token refresh   | Silent refresh on 401 response                             |
| Logout          | Clear tokens, redirect to Login                            |
| Auth guard      | Unauthenticated users redirected to Login                  |

### 2. Expense Management (CRUD)
| Field    | Type     | Validation                                |
|----------|----------|-------------------------------------------|
| amount   | Number   | Required, > 0, max 2 decimal places       |
| category | String   | Required, one of predefined categories    |
| date     | Date     | Required, not future date                  |
| note     | String   | Optional, max 200 chars                   |

**Categories:** Food, Transport, Shopping, Entertainment, Health, Education, Bills, Other

### 3. Dashboard
- Total spending for current month
- Category-wise breakdown (amount + percentage)
- Visual bar/pie chart per category (using `react-native-chart-kit`)
- Recent 5 expenses list
- Empty state when no expenses exist

### 4. Expense List
- Paginated list of all expenses (newest first)
- Swipe-to-delete with confirmation prompt
- Tap to edit
- Search/filter by category
- Empty state component

### 5. Error & Loading States
- Skeleton loaders or spinner during API calls
- Error boundary / error messages on API failure
- Retry button on failure
- Offline-aware messaging (NetInfo)

---

## API Specification

### Base URL
```
http://localhost:5000/api
```

### Auth Endpoints
```
POST   /auth/register     → { name, email, password }
POST   /auth/login        → { email, password }
POST   /auth/refresh      → { refreshToken }
```

### Expense Endpoints (all protected — Bearer token required)
```
GET    /expenses          → list (supports ?category=&page=&limit= query params)
POST   /expenses          → create expense
GET    /expenses/:id      → get single expense
PUT    /expenses/:id      → update expense
DELETE /expenses/:id      → delete expense
GET    /expenses/summary  → category-wise total for given month (?month=YYYY-MM)
```

### Response Envelope
```json
{
  "success": true,
  "data": { ... },
  "message": "optional message",
  "pagination": { "total": 0, "page": 1, "limit": 10 }
}
```

---

## Data Models

### User
```js
{
  name:         String,  required, trim
  email:        String,  required, unique, lowercase
  password:     String,  required, bcrypt-hashed
  refreshToken: String,  nullable
  createdAt:    Date
}
```

### Expense
```js
{
  user:      ObjectId,   ref: 'User', required
  amount:    Number,     required, min: 0.01
  category:  String,     enum: [...CATEGORIES], required
  date:      Date,       required
  note:      String,     maxlength: 200
  createdAt: Date
}
```

---

## Non-Functional Requirements

| Area        | Requirement                                                        |
|-------------|--------------------------------------------------------------------|
| Security    | Passwords hashed with bcrypt (salt rounds ≥ 10)                   |
| Security    | JWT secret in env variables, never committed                       |
| Performance | API responses < 300ms for typical queries                          |
| Code style  | ESLint + Prettier enforced                                         |
| Env config  | `.env.example` provided, `.env` git-ignored                       |
| README      | Setup + run instructions for both backend and mobile               |

---

## Screens Summary

| Screen           | Route / Tab         | Key Elements                              |
|------------------|---------------------|-------------------------------------------|
| Login            | Auth Stack          | Email, Password, Login CTA, → Register    |
| Register         | Auth Stack          | Name, Email, Password, Register CTA       |
| Dashboard        | Tab: Home           | Summary cards, chart, recent expenses     |
| Expense List     | Tab: Expenses       | FlatList, swipe-delete, category filter   |
| Add Expense      | Modal / Stack       | Form (amount, category, date, note)       |
| Edit Expense     | Stack               | Pre-filled form                           |
| Profile          | Tab: Profile        | User info, logout button                  |

---

## Edge Cases to Handle

1. **Empty states** — No expenses: show illustration + CTA prompt
2. **Network errors** — Show user-friendly messages, allow retry
3. **Duplicate registration** — 409 conflict response surfaced to UI
4. **Zero-amount submission** — Client + server validation
5. **Future date submission** — Blocked at form level
6. **Token expiry** — Silent refresh before retrying failed request
7. **Long category lists** — Scrollable pickers, not cut off
8. **Large amounts** — Formatted with commas and currency symbol
9. **Very long notes** — Truncated in list view, full in detail view

---

## Evaluation Alignment

| Criteria                          | How Addressed                                              |
|-----------------------------------|------------------------------------------------------------|
| RN component design & navigation  | Stack + Bottom Tabs, reusable component library            |
| State management                  | Context API + useReducer for auth and expenses             |
| API integration & async handling  | Axios interceptors, loading/error/success states           |
| Edge cases & form validation      | Formik + Yup client-side, express-validator server-side    |
| Code readability & structure      | Feature-based folder structure, consistent naming          |
