import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import { TextInput, Button, HelperText, Chip } from 'react-native-paper';
import { ExpenseContext } from '../contexts/ExpenseContext';
import { CATEGORIES } from '../constants';
import { expenseSchema } from '../validation';

export default function EditExpenseScreen({ route, navigation }) {
  const { expense } = route.params;
  const { updateExpense, deleteExpense } = useContext(ExpenseContext);
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
      await expenseSchema.validate({ amount: Number(amount), category, date, note });
      await updateExpense(expense._id, { amount: Number(amount), category, date, note });
      navigation.goBack();
    } catch (err) {
      const validationError = err.response?.data?.errors?.[0]?.msg;
      setError(validationError || err.response?.data?.msg || err.message || 'Failed to update expense');
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    setError('');
    try {
      await deleteExpense(expense._id);
      navigation.goBack();
    } catch (err) {
      setError(err.response?.data?.msg || err.message || 'Failed to delete expense');
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
      <Button mode="contained" onPress={handleEdit} loading={loading} style={{ marginTop: 16 }}>
        Save Changes
      </Button>
      <Button mode="outlined" onPress={handleDelete} disabled={loading} style={{ marginTop: 8 }}>
        Delete Expense
      </Button>
    </View>
  );
}
