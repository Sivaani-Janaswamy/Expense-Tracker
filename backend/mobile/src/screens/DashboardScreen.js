import React, { useContext, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { Card, Text, ActivityIndicator } from 'react-native-paper';
import { ExpenseContext } from '../contexts/ExpenseContext';
import { CATEGORIES } from '../constants';
import { BarChart } from 'react-native-chart-kit';

export default function DashboardScreen() {
  const { summary, fetchSummary, loading } = useContext(ExpenseContext);

  useEffect(() => {
    fetchSummary();
  }, []);

  if (loading) return <ActivityIndicator />;

  const data = {
    labels: summary.map((s) => s.category),
    datasets: [{ data: summary.map((s) => s.total) }],
  };

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text variant="titleLarge">Category Summary</Text>
      <BarChart
        data={data}
        width={320}
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
