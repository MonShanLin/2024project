import { StyleSheet, SafeAreaView, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';
import GoalDetails from './components/GoalDetails';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: 'purple' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'All Goals',
          }}
        />
        <Stack.Screen
          name="Details"
          component={GoalDetails}
          options={({ route }) => ({
            title: route.params ? route.params.goal.text : 'Goal Details',
          })}
        />
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
