import React, { useState } from 'react'
import { TextInput, Text, View, StyleSheet } from 'react-native';

export default function Input({focus}) {
    const [text, setText] = useState("");
    
    return (
        <View style={styles.container}>
            <TextInput
                value={text}
                placeholder="Type something here"
                autoFocus={focus}
                autoCorrect={true} 
                keyboardType="default"
                style={styles.input}
                onChangeText={(changedText) => {
                    setText(changedText);    
                }}
            />
        {text.length > 0 && (
            <Text style={styles.charCount}>Character count: {text.length}</Text>
        )}
        </View>
    )
}


const styles = StyleSheet.create({
  container: {
    width: '80%',
    alignItems: 'center',
  },
  input: {
    borderBottomColor: "purple",
    borderBottomWidth: 2,
    width: '100%',
    marginBottom: 10,
    padding: 5,
  },
  charCount: {
    marginTop: 5,
    color: 'gray',
  }
});
