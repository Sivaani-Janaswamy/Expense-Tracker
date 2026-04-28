# Expense Tracker Backend

## Setup & Run Instructions

### Prerequisites
- Node.js (LTS)
- npm or yarn
- MongoDB (local or Atlas)

### Install Dependencies
```
cd backend
npm install
```

### Environment Variables
- Copy `.env.example` to `.env` and fill in your MongoDB URI and JWT secret.

### Start the Server
```
npm start
```
- Server runs on port 5000 by default.

### API Endpoints
- `/api/auth/register` — Register user
- `/api/auth/login` — Login user
- `/api/auth/refresh` — Refresh token
- `/api/expenses` — CRUD for expenses
- `/api/expenses/summary` — Category summary

---

For mobile app setup, see backend/mobile/README.md.
