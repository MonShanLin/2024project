import React, {useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
import PressableButton from './PressableButton';
import { FontAwesome } from '@expo/vector-icons';

export default function GoalDetails ({ route, navigation }) {
  const { goal, moreDetails } = route.params;
  const [textColor, setTextColor] = useState(route.params.textColor ||'black');

  const handleWarning = () => {
    setTextColor('red');
    navigation.setParams({ textColor: 'red' });
    navigation.setOptions({ title: 'Warning!' });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableButton onPress={handleWarning} style={{ backgroundColor: 'transparent' }}>
          <FontAwesome name="exclamation-triangle" size={24} color={ 'white'} />
        </PressableButton>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (route.params?.textColor) {
      setTextColor(route.params.textColor);
    }
  }, [route.params?.textColor]);

  return (
    <View style={styles.container}>
        {!moreDetails ? (
            <>
          <Text style={[styles.goalText, { color: textColor }]}>
            You are seeing the details of the goal with text: {goal.text} and id: {goal.id}
          </Text> 

          <Button
            title="More details"
            onPress={() => navigation.push('Details', { goal,moreDetails: true  })} 
          />
        </>
    ) : (
        <>
          <Text style={[styles.moreDetailsText, { color: textColor }]}>
               More Details
          </Text> 
            
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

  goalText: {
    fontSize: 16,
    color: 'black',
  },

  moreDetailsText: {
    fontSize: 18,
    color: 'black',
    },
});