import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';
import GoalDetails from './components/GoalDetails';
import Login from './components/Login';
import Signup from './components/Signup';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator
        initialRouteName="Login" // Set Login as the initial screen
        screenOptions={{
          headerStyle: { backgroundColor: 'purple' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {/* Login Screen */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'Login',
          }}
        />

        {/* Signup Screen */}
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            title: 'Signup',
          }}
        />
          
          {/* Home Screen */}
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'All Goals',
          }}
        />
          
          {/* Details Screen */}
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
