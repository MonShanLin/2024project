import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { auth } from '../Firebase/firebaseSetup';

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    setUser(currentUser);
  }, []);

  if (!user) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Email: {user.email}</Text>
      <Text style={styles.text}>UID: {user.uid}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 18,
    color: 'black',
    marginVertical: 5,
  },
});
