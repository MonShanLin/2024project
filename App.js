import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView,  FlatList, Alert } from 'react-native';
import Header from './components/Header';
import Input from './components/Input';
import GoalItem from './components/GoalItem';
import { useState } from 'react';

export default function App() {
  const appName = "Phoebe's app!"; 
  const inputFocus = true;
  const [multiGoals, setMultiGoals] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleInputData = (text) => {
    setMultiGoals((prevGoals) => [
      ...prevGoals,
      { text: text, id: Math.random().toString() },
    ]);
    setIsModalVisible(false);
  };

  const handleDeleteGoal = (goalId) => {
    setMultiGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalId));
  };

  const handleDeleteAll = () => {
    Alert.alert(
      "Delete All",
      "Do you want to delete all?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            setMultiGoals([]);
          },
        },
      ]
    );
  };

  const handleCancelButton = () => {
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.topView}>
        <Header name={appName}/>
        <Button title="Add a goal" onPress={() => setIsModalVisible(true)} /> 
      </View>

      <Input focus={inputFocus} onConfirm={handleInputData} onCancel={handleCancelButton} visible={isModalVisible} />

<View  style={styles.bottomView} >
    <FlatList
          data={multiGoals}  
          renderItem={({ item }) => <GoalItem goal={item} onDelete={handleDeleteGoal}/>}
          keyExtractor={(item) => item.id}  
          contentContainerStyle={styles.scrollContent}
          
          ListHeaderComponent={multiGoals.length > 0 ? <Text style={styles.listHeader}>My Goals</Text> : null}
          
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

          ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
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

  listSeparator: {
    height: 5,
    backgroundColor: 'grey',
    marginBottom: 10,
    marginTop: 10,
  },
});

