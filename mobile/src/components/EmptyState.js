import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function EmptyState({ message, actionLabel, onAction }) {
  return (
    <View style={{ alignItems: 'center', margin: 32 }}>
      <Text>{message || 'No data found.'}</Text>
      {actionLabel && onAction ? (
        <Button mode="contained-tonal" onPress={onAction} style={{ marginTop: 12 }}>
          {actionLabel}
        </Button>
      ) : null}
    </View>
  );
}
