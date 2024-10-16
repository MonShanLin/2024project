import React from 'react';
import { View, Text, StyleSheet, Button, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PressableButton from './PressableButton';
import { FontAwesome } from '@expo/vector-icons';

export default function GoalItem ({ goal, onDelete, onInfoPress, onPressIn, onPressOut }) {

  const navigation = useNavigation();

  const handleLongPress = () => {
    Alert.alert(
      "Delete?",
      "Do you want to delete this goal?",
      [
        {
          text: "Cancel",  
        },
        {
          text: "Delete",
          onPress: () => onDelete(goal.id),
          style: "destructive",
        },
      ]
    );
  };

  return (
    <Pressable
      onPress={() => onInfoPress(goal)}
      onLongPress={handleLongPress}
      onPressIn={onPressIn} 
      onPressOut={onPressOut} 
      style={({ pressed }) => [
        styles.goalItemContainer,
        pressed && styles.pressedItem,
      ]}
    >
     
        <Text style={styles.goalItem}>{goal.text}</Text>

        <PressableButton 
          onPress={() => onDelete(goal.id)} style={styles.deleteButton}>
         <FontAwesome name="trash" size={24} color="black" /> 
        </PressableButton>     
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

  deleteText: {
    color: 'red',
    fontWeight: 'bold',
  },
});