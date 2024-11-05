import React, {useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import PressableButton from './PressableButton';
import { FontAwesome } from '@expo/vector-icons';
import { updateDB } from '../Firebase/firestoreHelper'; 
import GoalUsers from './GoalUsers';
import { storage } from '../Firebase/firebaseSetup';
import { getDownloadURL, ref } from 'firebase/storage';

export default function GoalDetails ({ route, navigation }) {
  const { goal, moreDetails } = route.params;
  const [textColor, setTextColor] = useState(route.params.textColor ||'black');
  const [imageUrl, setImageUrl] = useState(null);

  const warningHandler = async () => {
    setTextColor('red');
    navigation.setOptions({
      title: 'Warning!'
    });
    
      updateDB(goal.id, { warning: true }, 'goals');
      console.log('Warning set for goal:', goal.id);
  };

 
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableButton onPress={warningHandler} style={{ backgroundColor: 'transparent' }}>
        <FontAwesome name="exclamation-triangle" size={24} color={'white'} />
        </PressableButton>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const fetchImageUrl = async () => {
      if (goal.imageUri) {
        try {
          const imageRef = ref(storage, goal.imageUri);
          const url = await getDownloadURL(imageRef);
          setImageUrl(url);
        } catch (error) {
          console.error("Error fetching image URL:", error);
        }
      }
    };

    fetchImageUrl();
  }, [goal.imageUri]);

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

      {imageUrl && (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      )}
      
      <GoalUsers goalId={goal.id} />
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

    image: {
      width: 200,
      height: 200,
      borderRadius: 10,
      marginVertical: 20,
    },

});
