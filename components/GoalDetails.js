import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function GoalDetails ({ route, navigation }) {

  const { goal, moreDetails } = route.params;

  return (
    <View style={styles.container}>
        {!moreDetails ? (
            <>
                <Text style={styles.title}>Goal Details</Text>
                <Text style={styles.goalText}>You are seeing the details of the goal with text: {goal.text} and id: {goal.id}</Text> 
                

                <Button
                title="More details"
                onPress={() => navigation.push('Details', { goal,moreDetails: true  })} 
                />
            </>
        ) : (
            <>
                <Text style={styles.moreDetailsText}>More Details</Text> 
            
                <Button
                    title="More details"
                    onPress={() => navigation.push('Details', { goal,moreDetails: true  })} 
                />
            </>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  goalText: {
    fontSize: 16,
    color: 'black',
  },
  goalId: {
    fontSize: 14,
    color: 'gray',
    marginTop: 10,
  },
  moreDetailsText: {
    fontSize: 18,
    color: 'black',
    },
});