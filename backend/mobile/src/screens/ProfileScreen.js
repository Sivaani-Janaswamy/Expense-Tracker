import React, { useContext } from 'react';
import { View } from 'react-native';
import { Card, Button, Text } from 'react-native-paper';
import { AuthContext } from '../contexts/AuthContext';

export default function ProfileScreen() {
  const { user, logout } = useContext(AuthContext);
  return (
    <View style={{ padding: 16 }}>
      <Card>
        <Card.Content>
          <Text variant="titleLarge">{user?.name}</Text>
          <Text>{user?.email}</Text>
        </Card.Content>
      </Card>
      <Button mode="contained" onPress={logout} style={{ marginTop: 16 }}>
        Logout
      </Button>
    </View>
  );
}
