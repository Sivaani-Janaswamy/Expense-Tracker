import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { AuthContext } from '../contexts/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await login(email, password);
    } catch (err) {
      setError('Invalid credentials');
    }
    setLoading(false);
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput label="Password" value={password} onChangeText={setPassword} secureTextEntry />
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      <Button mode="contained" onPress={handleLogin} loading={loading} style={{ marginTop: 16 }}>
        Login
      </Button>
      <Button onPress={() => navigation.navigate('Register')} style={{ marginTop: 8 }}>
        Don't have an account? Register
      </Button>
    </View>
  );
}
