import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function GoalItem ({ goal, onDelete }) {
    
    return (
        <View style={styles.goalItemContainer}>
          <Text style={styles.goalItem}>{goal.text}</Text>
          <Button
            title="X"
            color="white"  
            onPress={() => onDelete(goal.id)} 
          />
        </View>
      );
    }

    const styles = StyleSheet.create({
        goalItemContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
          marginTop: 10,
        },
      
        goalItem: {
          padding: 10,
          fontSize: 16,
          borderColor: 'darkorchid',
          borderWidth: 1,
          borderRadius: 5,
          color: 'purple',
          backgroundColor: 'gainsboro',
          marginRight: 10,
        },
      });

