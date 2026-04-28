# Expense Tracker UI Template (React Native)

**Chosen UI Library:** React Native Paper

React Native Paper is easy to set up, follows Material Design, and has a wide range of ready-to-use components. It integrates well with Expo and supports theming, icons, and accessibility out of the box.

---

## General Guidelines
- Use Paper components for all UI elements (Button, Card, TextInput, Appbar, etc.)
- Maintain consistent spacing and padding (use Paper's theme.spacing)
- Use Material icons from `react-native-vector-icons/MaterialCommunityIcons`
- Light theme by default, but support dark mode if time permits
- Use Paper's Snackbar for error/success messages

---

## App Structure & Navigation
- **AppBar**: Top bar with app title and profile icon
- **Bottom Navigation**: Dashboard, Expenses, Profile
- **Stack Navigation**: For auth flow (Login/Register)

---

## Screens & Key Components

### 1. Auth Screens
- **LoginScreen**
  - Paper TextInput (email, password)
  - Paper Button (Login)
  - Link to Register
- **RegisterScreen**
  - Paper TextInput (name, email, password, confirm password)
  - Paper Button (Register)
  - Link to Login

### 2. Dashboard
- **Summary Cards**: Category-wise expense totals (Paper Card)
- **Chart**: Pie/Bar chart (use `react-native-paper` + `react-native-chart-kit`)
- **Recent Expenses**: List (Paper List.Item)

### 3. Expenses
- **Expense List**: FlatList of Paper Card/List.Item
- **Add/Edit Expense Modal**: Paper Dialog with TextInputs (amount, category, date, note), Save/Cancel buttons
- **Delete**: IconButton in list item

### 4. Profile
- **User Info**: Paper Card with name/email
- **Logout Button**: Paper Button

---

## Theming & Colors
- Use Paper's default theme
- Accent color for buttons (e.g., theme.colors.primary)
- Consistent use of spacing and font sizes

---

## Error/Loading States
- Paper ActivityIndicator for loading
- Paper Snackbar for errors/messages
- Empty state: Show Paper illustration or message

---

## Example Component Usage
```jsx
import { Button, Card, TextInput, Snackbar, ActivityIndicator } from 'react-native-paper';
```

---

## Quick Setup
1. `expo install react-native-paper react-native-vector-icons react-native-chart-kit`
2. Wrap app in `<PaperProvider>`
3. Use Paper components as per above structure

---

Refer to this template for consistent UI and component usage throughout development.