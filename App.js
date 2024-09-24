import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView,  FlatList } from 'react-native';
import Header from './components/Header';
import Input from './components/Input';
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

      <View style={styles.bottomView}>
        <Text style={styles.header}>Your Goals:</Text>
        {multiGoals.length === 0 ? (
          <Text>No goals added yet</Text>
        ) : (
          <FlatList
            data={multiGoals}
            renderItem={({ item }) => <Text style={styles.goalItem}>{item.text}</Text>}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
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
    alignItems: 'center',
  },

  header: {
    fontSize: 18,
    fontWeight: 'bold',
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
});