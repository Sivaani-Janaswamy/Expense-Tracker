import React from 'react';
import { Text } from 'react-native-paper';

export default function ErrorMessage({ error }) {
  if (!error) return null;
  return <Text style={{ color: 'red', margin: 8 }}>{error}</Text>;
}
