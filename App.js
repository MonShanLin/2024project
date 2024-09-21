import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import Input from './components/Input';

export default function App() {
  const appName = "Mon-Shan's app!"; 
  const inputFocus = true;
  
  return (
    <View style={styles.container}>
      <Header name={appName} />
      <StatusBar style="auto" />
      <Input focus={inputFocus}/>
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