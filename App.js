import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FontAwesome } from '@expo/vector-icons';
import { auth } from './Firebase/firebaseSetup';
import * as Notifications from 'expo-notifications';
import Home from './components/Home';
import GoalDetails from './components/GoalDetails';
import Profile from './components/Profile';
import Login from './components/Login';
import Signup from './components/Signup';
import Map from './components/Map';

// Set the notification handler (outside the App function)
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true, // Show an alert when the notification is received
      shouldPlaySound: true, // Play a sound with the notification
      shouldSetBadge: true, // Update app badge count (iOS specific)
    };
  },
});

const Stack = createNativeStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return unsubscribe;
  }, []);

  const AuthStack = (
    <>
      <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
      <Stack.Screen name="Signup" component={Signup} options={{ title: 'Signup' }} />
    </>
  );

  const AppStack = (
    <>
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          title: 'All My Goals',
          headerRight: () => (
            <FontAwesome
              name="user"
              size={24}
              color="white"
              onPress={() => navigation.navigate('Profile')}
              style={{ marginRight: 10 }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Details"
        component={GoalDetails}
        options={({ route }) => ({
          title: route.params ? route.params.goal.text : 'Goal Details',
        })}
      />
      <Stack.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
      <Stack.Screen name="Map" component={Map} options={{ title: 'Map' }} />
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