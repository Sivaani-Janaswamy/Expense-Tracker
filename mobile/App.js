import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { AuthProvider } from './src/contexts/AuthContext';
import { ExpenseProvider } from './src/contexts/ExpenseContext';
import AppNavigator from './src/navigation/AppNavigator';
import NetworkStatus from './src/components/NetworkStatus';

export default function App() {
  return (
    <PaperProvider>
      <AuthProvider>
        <ExpenseProvider>
          <StatusBar style="auto" />
          <AppNavigator />
          <NetworkStatus />
        </ExpenseProvider>
      </AuthProvider>
    </PaperProvider>
  );
}
