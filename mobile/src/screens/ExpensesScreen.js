import React, { useContext, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { List, FAB } from 'react-native-paper';
import { ExpenseContext } from '../contexts/ExpenseContext';
import EmptyState from '../components/EmptyState';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';

export default function ExpensesScreen({ navigation }) {
  const { expenses, fetchExpenses, loading, error } = useContext(ExpenseContext);

  useEffect(() => {
    fetchExpenses();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
        <ErrorMessage error={error} onRetry={fetchExpenses} />
      </View>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item._id}
        contentContainerStyle={expenses.length ? { paddingBottom: 96 } : { flexGrow: 1, justifyContent: 'center' }}
        ListEmptyComponent={
          <EmptyState
            message="No expenses recorded yet."
            actionLabel="Add Expense"
            onAction={() => navigation.navigate('AddExpense')}
          />
        }
        renderItem={({ item }) => (
          <List.Item
            title={`$${item.amount} - ${item.category}`}
            description={item.note}
            onPress={() => navigation.navigate('EditExpense', { expense: item })}
            right={() => <List.Icon icon="chevron-right" />}
          />
        )}
      />
      <FAB
        icon="plus"
        style={{ position: 'absolute', right: 16, bottom: 16 }}
        onPress={() => navigation.navigate('AddExpense')}
      />
    </View>
  );
}
