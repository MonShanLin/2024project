import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput,Button, SafeAreaView } from 'react-native';
import Header from './components/Header';
import Input from './components/Input';
import { useState } from 'react';
export default function App() {
  const appName = "Mon-Shan's app!"; 
  const inputFocus = true;
  const [inputText, setInputText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleInputData = (text) => {
    setInputText(text);
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.topＶiew}>
        <Header name={appName}/>
        <Button title="Add a goal" onPress={() => setIsModalVisible(true)} /> 
      </View>

      <Input focus={inputFocus} onConfirm={handleInputData} visible={isModalVisible} />

      <View style={styles.bottomView}>
        <Text>{inputText ? `You typed: ${inputText}` : "No input received yet"}</Text>
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

  topＶiew: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomView: {
    flex: 4,
    backgroundColor: 'pink',
    alignItems: 'center',
  } 
});