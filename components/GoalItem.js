import React from 'react';
import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function GoalItem ({ goal, onDelete }) {

  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate('Details', { goal })}
      android_ripple={{ color: 'pink' }} 
      style={({ pressed }) => [
        styles.goalItemContainer,
        pressed && styles.pressedItem,
      ]}
    >
     
        <Text style={styles.goalItem}>{goal.text}</Text>

      <Pressable onPress={() => onDelete(goal.id)}
        android_ripple={{ color: 'red' }}
        style={({ pressed }) => [
          styles.deleteButton,
          pressed && styles.pressedDeleteButton,
        ]}
      >

       <Text style={styles.deleteText}>X</Text>
      </Pressable>     
    </Pressable>
);
}

const styles = StyleSheet.create({
  goalItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
    borderColor: 'darkorchid',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'gainsboro',
  },

  goalItem: {
    fontSize: 16,
    color: 'purple',
  },

  pressedItem: {
    backgroundColor: 'pink', 
  },

  deleteButton: {
    padding: 5,
    borderRadius: 5, 
  },

  pressedDeleteButton: {
    opacity: 0.7,
  },
  
  deleteText: {
    color: 'red',
    fontWeight: 'bold',
  },
});