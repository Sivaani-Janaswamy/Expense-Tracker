import React, { useState, useContext, useEffect } from 'react';
import { View } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { ExpenseContext } from '../contexts/ExpenseContext';
import { CATEGORIES } from '../constants';
import { Picker } from '@react-native-picker/picker';

export default function EditExpenseScreen({ route, navigation }) {
  const { expense } = route.params;
  const { fetchExpenses } = useContext(ExpenseContext);
  const [amount, setAmount] = useState(expense.amount.toString());
  const [category, setCategory] = useState(expense.category);
  const [date, setDate] = useState(expense.date.slice(0, 10));
  const [note, setNote] = useState(expense.note || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEdit = async () => {
    setLoading(true);
    setError('');
    try {
      // Add API call here
      // await api.put(`/expenses/${expense._id}`, { amount, category, date, note });
      await fetchExpenses();
      navigation.goBack();
    } catch (err) {
      setError('Failed to update expense');
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
      <Button mode="contained" onPress={handleEdit} loading={loading} style={{ marginTop: 16 }}>
        Save Changes
      </Button>
    </View>
  );
}
