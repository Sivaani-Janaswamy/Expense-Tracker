# Expense Tracker Mobile App

## Setup & Run Instructions

### Prerequisites
- Node.js (LTS)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Install Dependencies
```
cd mobile
npm install
```

### Start the App
```
npx expo start
```
- Use the Expo Go app on your phone to scan the QR code, or run on an emulator.

### Environment
- API base URL is set in `src/constants.js` (`API_BASE_URL`).
- Make sure your backend server is running and accessible from your device.

### Features
- JWT authentication (login/register)
- Add, edit, delete expenses
- Dashboard with category summary
- Offline/network error handling
- Loading and error states

---

For backend setup, see the backend/README.md.
