import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import Header from './Header';
import Input from './Input';
import GoalItem from './GoalItem';
import { useState, useEffect  } from 'react';
import PressableButton from './PressableButton';
import { database } from '../Firebase/firebaseSetup';

export default function Home({ navigation }) {
  const appName = "Phoebe's app!";
  const inputFocus = true;
  const [multiGoals, setMultiGoals] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(database, "goals"), (querySnapshot) => {
      if (!querySnapshot.empty) {
        const updatedGoals = [];
        querySnapshot.forEach((doc) => {
          updatedGoals.push({ ...doc.data(), id: doc.id });
        });
        setMultiGoals(updatedGoals); 
      } else {
        setMultiGoals([]); 
      }
    });

    return () => unsubscribe();
  }, []); 

  const handleInputData = (text) => {
    setMultiGoals((prevGoals) => [
      ...prevGoals,
      { text: text, id: Math.random().toString() },
    ]);
    setIsModalVisible(false);
  };

  const handleDeleteGoal = (goalId) => {
    setMultiGoals((prevGoals) =>
      prevGoals.filter((goal) => goal.id !== goalId)
    );
  };

  const handleDeleteAll = () => {
    Alert.alert('Delete All', 'Do you want to delete all?', [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          setMultiGoals([]);
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
          renderItem={({ item, separators  }) => (
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
