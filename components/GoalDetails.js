import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function GoalDetails ({ route }) {

  const { goal } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Goal Details</Text>
      <Text style={styles.goalText}>Goal: {goal.text}</Text> 
      <Text style={styles.goalId}>ID: {goal.id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 16,
  },
 
  goalText: {
    fontSize: 16,
    color: 'black',
  },
});