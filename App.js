import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView,  FlatList} from 'react-native';
import Header from './components/Header';
import Input from './components/Input';
import GoalItem from './components/GoalItem';
import { useState } from 'react';

export default function App() {
  const appName = "Phoebe's app!"; 
  const inputFocus = true;
  const [inputText, setInputText] = useState("");
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
          ListHeaderComponent={multiGoals.length > 0 ? <Text style={styles.headerText}>My Goals</Text> : null}
          ListEmptyComponent={
          <Text style={styles.emptyList}>No goals to show</Text>
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
  },

  scrollContent: {
    alignItems: 'center',
  },

  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
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

  emptyList: {
    fontSize: 22,
    color: 'darkorchid',
    textAlign: 'center',
    marginVertical: 20,
  },

  headerText: {
    fontSize: 22,
    color: 'darkorchid',
    marginVertical: 20,
    textAlign: 'center',
  },
});

