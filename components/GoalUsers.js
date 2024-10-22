import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, Button } from 'react-native';

export default function GoalUsers({ goalId }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        Alert.alert('Error', 'Failed to load users data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [goalId]);

  const handlePostRequest = async () => {
    const fakeUser = {
      name: 'New User',
    };

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fakeUser),
      });

      if (!response.ok) {
        throw new Error(`Failed to POST data, status: ${response.status}`);
      }

      const data = await response.json();
      Alert.alert('Success', `User added with ID: ${data.id}`);
      console.log('POST Response:', data);
    } catch (error) {
      console.error('Error with POST request:', error);
      Alert.alert('Error', 'Failed to add user.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading users...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Goal Users</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text style={styles.userText}>{item.name}</Text>
          </View>
        )}
      />
      <Button title="Add Fake User" onPress={handlePostRequest} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userItem: {
    marginBottom: 15,
  },
  userText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});