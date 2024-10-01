import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function GoalDetails ({ route }) {

  const { goal } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.goalText}>{goal.text}</Text>
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