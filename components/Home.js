import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView,  FlatList, Alert } from 'react-native';
import { query, collection, where, onSnapshot } from 'firebase/firestore';
import Header from './Header';
import Input from './Input';
import GoalItem from './GoalItem';
import { useState, useEffect } from 'react';
import PressableButton from './PressableButton';
import { auth, database } from '../Firebase/firebaseSetup';
import { writeToDB, deleteFromDB, deleteAllFromDB } from '../Firebase/firestoreHelper';
import { ref, uploadBytesResumable } from 'firebase/storage'; // Import storage functions
import { storage } from '../Firebase/firebaseSetup';

export default function Home({ navigation }) {
  const appName = "Phoebe's app!";
  const inputFocus = true;
  const [multiGoals, setMultiGoals] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (!auth.currentUser) return;

    // Define a query to fetch only documents owned by the current user
    const userGoalsQuery = query(
      collection(database, 'goals'),
      where('owner', '==', auth.currentUser.uid)
    );

    // Set up the onSnapshot listener with error handling for permission issues
    const unsubscribe = onSnapshot(
      userGoalsQuery,
      (querySnapshot) => {
        let goalsArray = [];
        querySnapshot.forEach((docSnapshot) => {
          goalsArray.push({ ...docSnapshot.data(), id: docSnapshot.id });
        });
        setMultiGoals(goalsArray);
      },
      (error) => {
        console.error("Error fetching goals: ", error.message);
        Alert.alert("Permission Denied", "You do not have access to these goals.");
      }
    );

    return () => unsubscribe();
  }, []);

  const uploadImageToStorage = async (uri) => {
    const imageName = uri.substring(uri.lastIndexOf('/') + 1);
    const imageRef = ref(storage, `images/${imageName}`);
  
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      
      const uploadResult = await uploadBytesResumable(imageRef, blob);
      return uploadResult.metadata.fullPath; // Return the image path for Firestore
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Upload Error", "Failed to upload image.");
      return null;
    }
  };

  const handleInputData = async ({ text, imageUri }) => {
    if (!text) {
      Alert.alert("Invalid Input", "Please enter text for the goal.");
      return;
    }

    let imagePath = null;

    if (imageUri) {
      imagePath = await uploadImageToStorage(imageUri); // Upload image if there's a URI
    }

    try {
      await writeToDB({ text, imageUri: imagePath }, 'goals'); // Save text and image path
      setIsModalVisible(false); // Close the modal
    } catch (error) {
      console.error("Error adding goal: ", error);
    }
  };
  

  const handleDeleteGoal = async (goalId) => {
    try {
      await deleteFromDB(goalId, 'goals');
      setMultiGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalId));
    } catch (error) {
      console.error("Error deleting goal: ", error);
    }
  };

  const handleDeleteAll = () => {
    Alert.alert('Delete All', 'Do you want to delete all?', [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: async () => {
          try {
            await deleteAllFromDB('goals');
            setMultiGoals([]);
          } catch (error) {
            console.error("Error deleting all goals: ", error);
          }
        },
      },
    ]);
  };

  const handleCancelButton = () => {
    setIsModalVisible(false);
  };

  const navigateToGoalDetails = (goal) => {
    navigation.navigate('Details', { goal });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.topView}>
        <Header name={appName} />
        <PressableButton
          onPress={() => setIsModalVisible(true)}
          style={styles.addButton}
        >
          <Text style={styles.buttonText}>Add a Goal</Text>
        </PressableButton>
      </View>

      <Input
        focus={inputFocus}
        onConfirm={handleInputData}
        onCancel={handleCancelButton}
        visible={isModalVisible}
      />

      <View style={styles.bottomView}>
        <FlatList
          ItemSeparatorComponent={({ highlighted }) => (
            <View
              style={[
                styles.separator,
                highlighted && styles.highlightedSeparator,
              ]}
            />
          )}
          data={multiGoals}
          renderItem={({ item, separators }) => (
            <GoalItem
              goal={item}
              onDelete={handleDeleteGoal}
              onInfoPress={navigateToGoalDetails}
              onPressIn={() => separators.highlight()}
              onPressOut={() => separators.unhighlight()}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.scrollContent}
          ListHeaderComponent={
            multiGoals.length > 0 ? (
              <Text style={styles.listHeader}>My Goals</Text>
            ) : null
          }
          ListEmptyComponent={
            <Text style={styles.listEmpty}>No goals to show</Text>
          }
          ListFooterComponent={
            multiGoals.length > 0 ? (
              <View style={styles.listFooter}>
                <Button title="Delete All" onPress={handleDeleteAll} />
              </View>
            ) : null
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },

  topView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomView: {
    flex: 4,
    backgroundColor: 'plum',
    width: '100%',
  },

  scrollContent: {
    alignItems: 'center',
  },

  listHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'darkorchid',
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

  listEmpty: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'darkorchid',
    textAlign: 'center',
    marginVertical: 20,
  },

  listHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'darkorchid',
    marginVertical: 20,
    textAlign: 'center',
  },

  listFooter: {
    marginVertical: 20,
    color: 'darkorchid',
  },

  separator: {
    height: 1,
    backgroundColor: 'grey',
  },

  highlightedSeparator: {
    height: 3,
    backgroundColor: 'red',
  },
});
