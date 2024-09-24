import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function GoalItem ({ goal }) {
    
    return (
        <View style={styles.goalItemContainer}>
          <Text style={styles.goalItem}>{goal.text}</Text>
        </View>
      );
    }

const styles = StyleSheet.create({
  goalItemContainer: {
    marginBottom: 10,
  },

  goalItem: {
    padding: 10,
    fontSize: 16,
    borderColor: 'darkorchid',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 5,
    color: 'purple',
    backgroundColor: 'gainsboro',
  },
});