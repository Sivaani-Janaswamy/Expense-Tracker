import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { ExpenseContext } from '../contexts/ExpenseContext';
import { CATEGORIES } from '../constants';
import { Picker } from '@react-native-picker/picker';

export default function AddExpenseScreen({ navigation }) {
  const { fetchExpenses } = useContext(ExpenseContext);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    setLoading(true);
    setError('');
    try {
      // Add API call here
      // await api.post('/expenses', { amount, category, date, note });
      await fetchExpenses();
      navigation.goBack();
    } catch (err) {
      setError('Failed to add expense');
    }
    setLoading(false);
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput label="Amount" value={amount} onChangeText={setAmount} keyboardType="numeric" />
      <HelperText type="error" visible={!!error}>{error}</HelperText>
      <Picker selectedValue={category} onValueChange={setCategory} style={{ marginVertical: 8 }}>
        {CATEGORIES.map((cat) => (
          <Picker.Item key={cat} label={cat} value={cat} />
        ))}
      </Picker>
      <TextInput label="Date" value={date} onChangeText={setDate} />
      <TextInput label="Note" value={note} onChangeText={setNote} />
      <Button mode="contained" onPress={handleAdd} loading={loading} style={{ marginTop: 16 }}>
        Add Expense
      </Button>
    </View>
  );
}
