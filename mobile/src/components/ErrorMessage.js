import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function ErrorMessage({ error, onRetry }) {
  if (!error) return null;

  return (
    <View style={{ marginVertical: 12 }}>
      <Text style={{ color: 'red' }}>{error}</Text>
      {onRetry ? (
        <Button mode="outlined" onPress={onRetry} style={{ marginTop: 8 }}>
          Retry
        </Button>
      ) : null}
    </View>
  );
}
