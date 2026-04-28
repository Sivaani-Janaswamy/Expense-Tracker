
# Expense Tracker App — Backend

A full-stack mobile expense tracker with a modern REST API backend built using Node.js, Express.js, and MongoDB. This backend powers the React Native mobile app, providing secure authentication, expense management, and analytics.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Troubleshooting](#troubleshooting)
- [Mobile App](#mobile-app)

---

## Features
- User registration and login (JWT authentication)
- Add, edit, delete, and view expenses
- Category-wise expense summary (dashboard analytics)
- RESTful API with validation and error handling
- Secure password hashing and token management

---

## Tech Stack
| Layer    | Technology         |
|----------|--------------------|
| Backend  | Node.js, Express.js|
| Database | MongoDB, Mongoose  |
| Auth     | JWT (access/refresh)|
| Validation| express-validator |

---

## Architecture
- Express.js REST API with modular routes/controllers
- MongoDB for persistent storage
- JWT for stateless authentication
- Validation and error handling middleware

---

## Project Structure
```
backend/
├── src/
│   ├── config/         # MongoDB connection
│   ├── middleware/     # Auth & error middleware
│   ├── models/         # User & Expense schemas
│   ├── routes/         # API endpoints
│   ├── controllers/    # Business logic
│   └── app.js          # Express app setup
├── .env.example        # Environment variable template
├── package.json        # Dependencies & scripts
└── server.js           # Entry point
```

---

## Setup & Installation

### Prerequisites
- Node.js (LTS recommended)
- npm or yarn
- MongoDB (local or Atlas)

### 1. Clone the Repository
```
git clone <your-repo-url>
cd ExpenseTracker/backend
```

### 2. Install Dependencies
```
npm install
```

### 3. Configure Environment Variables
- Copy `.env.example` to `.env`:
	- Set your `MONGO_URI` (MongoDB connection string)
	- Set your `JWT_SECRET` (random string)

### 4. Start the Server
```
npm start
```
- Server runs on port 5000 by default.

---

## Usage
- The backend provides a REST API for the mobile app.
- Test endpoints with Postman or curl (see API Reference).
- Ensure your MongoDB instance is running and accessible.

---

## API Reference

### Auth
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive JWT tokens
- `POST /api/auth/refresh` — Refresh access token

### Expenses
- `GET /api/expenses` — List all expenses (auth required)
- `POST /api/expenses` — Add a new expense
- `GET /api/expenses/:id` — Get a single expense
- `PUT /api/expenses/:id` — Update an expense
- `DELETE /api/expenses/:id` — Delete an expense
- `GET /api/expenses/summary` — Get category-wise summary

---

## Troubleshooting
- **CORS errors:** Ensure the backend is running and accessible from your mobile device/emulator. Update CORS settings if needed.
- **MongoDB connection issues:** Double-check your `MONGO_URI` and network/firewall settings.
- **JWT errors:** Make sure your `JWT_SECRET` is set and tokens are sent in the `Authorization` header.

---

## Mobile App
See [`backend/mobile/README.md`](../mobile/README.md) for mobile setup and usage instructions.
