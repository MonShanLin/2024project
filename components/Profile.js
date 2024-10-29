import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { auth } from '../Firebase/firebaseSetup';
import { signOut } from 'firebase/auth';

export default function Profile({ navigation }) {
  const currentUser = auth.currentUser;

  // Function to handle sign out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.replace('Login'); // Navigate to Login after signing out
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <FontAwesome
          name="sign-out"
          size={24}
          color="white"
          onPress={handleSignOut}
          style={{ marginRight: 15 }}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>{currentUser?.email}</Text>
      <Text>{currentUser?.uid}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
