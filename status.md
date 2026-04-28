# Expense Tracker — Project Status

## Overall Progress

| Phase              | Status      | Notes                              |
|--------------------|-------------|------------------------------------|
| Spec & Planning    | ✅ Done      | spec.md complete                   |
| Backend Setup      | ✅ Done      | backend folder, npm init, dependencies installed |
| Backend Auth API   | ⬜ Pending   |                                    |
| Backend Expense API| ⬜ Pending   |                                    |
| Mobile Setup       | ✅ Done      |                                    |
| Mobile Auth Screens| ✅ Done      |                                    |
| Mobile Navigation  | ✅ Done      |                                    |
| State Management   | ✅ Done      |                                    |
| Dashboard Screen   | ✅ Done      |                                    |
| Expense CRUD UI    | ✅ Done      |                                    |
| Profile Screen     | ✅ Done      |                                    |
| Error / Edge Cases | ⬜ Pending   |                                    |
| README             | ⬜ Pending   |                                    |

---

## Phase Breakdown

### Phase 1 — Backend

- [x] `backend/` folder init (`npm init`, dependencies)
- [x] MongoDB connection (`config/db.js`)
- [x] User model + Expense model
- [x] Auth routes: `/register`, `/login`, `/refresh`
- [x] JWT middleware (`middleware/auth.js`)
- [x] Expense routes: GET list, POST, GET by id, PUT, DELETE, GET summary
- [x] Global error handler
- [x] `.env.example`
- [x] Smoke test all endpoints

### Phase 2 — Mobile App

- [x] Expo project init
- [x] Install dependencies (React Navigation, Axios, Formik, Yup, AsyncStorage, react-native-chart-kit)
- [x] Constants (colors, categories, api base URL)
- [x] Axios client with interceptors
- [x] AuthContext + useReducer
- [x] ExpenseContext + useReducer
- [x] AppNavigator (auth guard logic)
- [x] AuthStack (Login + Register screens)
- [x] MainTabs (Dashboard, Expenses, Profile)

### Phase 3 — Screens & Components

- [x] Common components: Button, Input, LoadingSpinner, ErrorMessage, EmptyState
- [x] LoginScreen (Formik + Yup)
- [x] RegisterScreen (Formik + Yup)
- [x] DashboardScreen (summary cards + chart + recent list)
- [x] ExpenseListScreen (FlatList + swipe-delete + category filter)
- [x] AddExpenseScreen (form)
- [x] EditExpenseScreen (pre-filled form)
- [x] ProfileScreen (user info + logout)

### Phase 4 — Polish & Finalize

- [ ] Loading states on all async actions
- [ ] Error states + retry buttons
- [ ] Empty state illustrations
- [ ] Offline / network error handling (NetInfo)
- [ ] README.md (setup + run instructions)

---

## Legend

| Symbol | Meaning     |
|--------|-------------|
| ✅     | Complete    |
| 🔄     | In Progress |
| ⬜     | Not Started |
| ❌     | Blocked     |
