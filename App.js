import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase/firebaseSetup';
import Home from './components/Home';
import GoalDetails from './components/GoalDetails';
import Login from './components/Login';
import Signup from './components/Signup';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Set up the authentication listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);  // User is signed in
      } else {
        setIsAuthenticated(false); // User is signed out
      }
    });

    // Clean up the listener on unmount
    return unsubscribe;
  }, []);

  const AuthStack = (
    <>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'Login',
        }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          title: 'Signup',
        }}
      />
    </>
  );

  const AppStack = (
    <>
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
    </>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: 'purple' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {isAuthenticated ? AppStack : AuthStack}
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