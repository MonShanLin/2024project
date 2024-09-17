import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Header from './components/Header';
import Input from './components/Input';
import { useState } from 'react';

export default function App() {
  const appName = "Mon-Shan's app!"; 
  const inputFocus = true;
  const [inputText, setInputText] = useState("");

  const handleInputData = (text) => {
    setInputText(text);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name={appName}/>
      <Input focus={inputFocus} onConfirm={handleInputData} />
      <Text>{inputText ? `You typed: ${inputText}` : "No input received yet"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});