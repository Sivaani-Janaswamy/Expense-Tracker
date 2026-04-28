import React, { useContext, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { List, FAB, ActivityIndicator } from 'react-native-paper';
import { ExpenseContext } from '../contexts/ExpenseContext';

export default function ExpensesScreen() {
  const { expenses, fetchExpenses, loading } = useContext(ExpenseContext);

  useEffect(() => {
    fetchExpenses();
  }, []);

  if (loading) return <ActivityIndicator />;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <List.Item
            title={`$${item.amount} - ${item.category}`}
            description={item.note}
            right={() => <List.Icon icon="chevron-right" />}
          />
        )}
      />
      <FAB icon="plus" style={{ position: 'absolute', right: 16, bottom: 16 }} onPress={() => {}} />
    </View>
  );
}
