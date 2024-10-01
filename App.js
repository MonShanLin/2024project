import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; 
import Home from './components/Home';

export default function App() {
  return (
    <NavigationContainer> 
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Home />
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});