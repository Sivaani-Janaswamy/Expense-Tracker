import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import { TextInput, Button, HelperText, Chip } from 'react-native-paper';
import { ExpenseContext } from '../contexts/ExpenseContext';
import { CATEGORIES } from '../constants';
import { expenseSchema } from '../validation';

const getToday = () => {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
};

export default function AddExpenseScreen({ navigation }) {
  const { createExpense } = useContext(ExpenseContext);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [date, setDate] = useState(getToday());
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    setLoading(true);
    setError('');
    try {
      await expenseSchema.validate({ amount: Number(amount), category, date, note });
      await createExpense({ amount: Number(amount), category, date, note });
      navigation.goBack();
    } catch (err) {
      const validationError = err.response?.data?.errors?.[0]?.msg;
      setError(validationError || err.response?.data?.msg || err.message || 'Failed to add expense');
    }
    setLoading(false);
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput label="Amount" value={amount} onChangeText={setAmount} keyboardType="numeric" />
      <HelperText type="error" visible={!!error}>{error}</HelperText>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginVertical: 12 }}>
        {CATEGORIES.map((cat) => (
          <Chip
            key={cat}
            selected={category === cat}
            onPress={() => setCategory(cat)}
            style={{ marginBottom: 8 }}
          >
            {cat}
          </Chip>
        ))}
      </View>
      <TextInput label="Date (YYYY-MM-DD)" value={date} onChangeText={setDate} />
      <TextInput label="Note" value={note} onChangeText={setNote} multiline numberOfLines={3} style={{ marginTop: 12 }} />
      <Button mode="contained" onPress={handleAdd} loading={loading} style={{ marginTop: 16 }}>
        Add Expense
      </Button>
    </View>
  );
}
