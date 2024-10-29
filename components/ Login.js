import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <Text style={styles.label}>Email Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Log In" onPress={() => { /* Handle login */ }} />

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>New User? Create an account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20, color: 'purple' },
  label: { fontSize: 16, marginVertical: 5 },
  input: { borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 15 },
  link: { color: 'blue', marginTop: 15, textAlign: 'center' },
});