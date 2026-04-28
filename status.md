# Expense Tracker — Project Status

## Overall Progress

| Phase              | Status      | Notes                              |
|--------------------|-------------|------------------------------------|
| Spec & Planning    | ✅ Done      | spec.md complete                   |
| Backend Setup      | ✅ Done      | backend folder, npm init, dependencies installed |
| Backend Auth API   | ⬜ Pending   |                                    |
| Backend Expense API| ⬜ Pending   |                                    |
| Mobile Setup       | ⬜ Pending   |                                    |
| Mobile Auth Screens| ⬜ Pending   |                                    |
| Mobile Navigation  | ⬜ Pending   |                                    |
| State Management   | ⬜ Pending   |                                    |
| Dashboard Screen   | ⬜ Pending   |                                    |
| Expense CRUD UI    | ⬜ Pending   |                                    |
| Profile Screen     | ⬜ Pending   |                                    |
| Error / Edge Cases | ⬜ Pending   |                                    |
| README             | ⬜ Pending   |                                    |

---

## Phase Breakdown

### Phase 1 — Backend

- [x] `backend/` folder init (`npm init`, dependencies)
- [x] MongoDB connection (`config/db.js`)
- [x] User model + Expense model
- [ ] Auth routes: `/register`, `/login`, `/refresh`
- [ ] JWT middleware (`middleware/auth.js`)
- [ ] Expense routes: GET list, POST, GET by id, PUT, DELETE, GET summary
- [ ] Global error handler
- [x] `.env.example`
- [ ] Smoke test all endpoints

### Phase 2 — Mobile App

- [ ] Expo project init
- [ ] Install dependencies (React Navigation, Axios, Formik, Yup, AsyncStorage, react-native-chart-kit)
- [ ] Constants (colors, categories, api base URL)
- [ ] Axios client with interceptors
- [ ] AuthContext + useReducer
- [ ] ExpenseContext + useReducer
- [ ] AppNavigator (auth guard logic)
- [ ] AuthStack (Login + Register screens)
- [ ] MainTabs (Dashboard, Expenses, Profile)

### Phase 3 — Screens & Components

- [ ] Common components: Button, Input, LoadingSpinner, ErrorMessage, EmptyState
- [ ] LoginScreen (Formik + Yup)
- [ ] RegisterScreen (Formik + Yup)
- [ ] DashboardScreen (summary cards + chart + recent list)
- [ ] ExpenseListScreen (FlatList + swipe-delete + category filter)
- [ ] AddExpenseScreen (form)
- [ ] EditExpenseScreen (pre-filled form)
- [ ] ProfileScreen (user info + logout)

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
