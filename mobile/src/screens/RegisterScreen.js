import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { AuthContext } from '../contexts/AuthContext';
import api from '../api';
import { registerSchema } from '../validation';

export default function RegisterScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    setError('');
    try {
      await registerSchema.validate({ name, email, password, confirm });
      await api.post('/auth/register', { name, email, password });
      await login(email, password);
    } catch (err) {
      setError(err.response?.data?.msg || err.message || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput label="Name" value={name} onChangeText={setName} />
      <TextInput label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" style={{ marginTop: 12 }} />
      <TextInput label="Password" value={password} onChangeText={setPassword} secureTextEntry style={{ marginTop: 12 }} />
      <TextInput label="Confirm Password" value={confirm} onChangeText={setConfirm} secureTextEntry style={{ marginTop: 12 }} />
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      <Button mode="contained" onPress={handleRegister} loading={loading} style={{ marginTop: 16 }}>
        Register
      </Button>
      <Button onPress={() => navigation.navigate('Login')} style={{ marginTop: 8 }}>
        Already have an account? Login
      </Button>
    </View>
  );
}
