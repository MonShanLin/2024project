import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Import createNativeStackNavigator
import Home from './components/Home';
import GoalDetails from './components/GoalDetails';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer> 
      <Stack.Navigator>
        
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={GoalDetails} />

      </Stack.Navigator>
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