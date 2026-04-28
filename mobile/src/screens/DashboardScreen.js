import React, { useContext, useEffect } from 'react';
import { ScrollView, useWindowDimensions } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { ExpenseContext } from '../contexts/ExpenseContext';
import { BarChart } from 'react-native-chart-kit';
import EmptyState from '../components/EmptyState';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';

export default function DashboardScreen() {
  const { summary, fetchSummary, loading, error } = useContext(ExpenseContext);
  const { width } = useWindowDimensions();

  useEffect(() => {
    fetchSummary();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (!summary.length) {
    return (
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text variant="titleLarge">Category Summary</Text>
        <ErrorMessage error={error} onRetry={fetchSummary} />
        <EmptyState message="No expenses yet. Add your first entry to see the dashboard summary." />
      </ScrollView>
    );
  }

  const data = {
    labels: summary.map((s) => s.category),
    datasets: [{ data: summary.map((s) => s.total) }],
  };

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text variant="titleLarge">Category Summary</Text>
      <ErrorMessage error={error} onRetry={fetchSummary} />
      <BarChart
        data={data}
        width={Math.max(width - 32, 280)}
        height={220}
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(98, 0, 238, ${opacity})`,
        }}
        style={{ marginVertical: 8 }}
      />
      {summary.map((s) => (
        <Card key={s.category} style={{ marginVertical: 4 }}>
          <Card.Content>
            <Text>{s.category}: ${s.total}</Text>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}
