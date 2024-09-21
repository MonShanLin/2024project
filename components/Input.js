import React, { useState } from 'react'
import { TextInput, Text, View, StyleSheet } from 'react-native';

export default function Input({focus}) {
    const [text, setText] = useState("");
    const [showCharacterCount, setShowCharacterCount] = useState(false);
    const [message, setMessage] = useState("");

    const handleTextInputBlur = () => {
        setShowCharacterCount(false);
        if (text.length >= 3) {
          setMessage("Thank you");
        } else {
          setMessage("Please type more than 3 characters");
        }
      };

    return (
        <View style={styles.container}>
            <TextInput
                value={text}
                placeholder="Type something here"
                autoFocus={focus}
                autoCorrect={true} 
                keyboardType="default"
                style={styles.inputText}
                onChangeText={(changedText) => {
                    setText(changedText);   
                    setShowCharacterCount(true);
                    setMessage("");
                }}
                onBlur={handleTextInputBlur}
            />
        {showCharacterCount && text.length > 0 && (
            <Text style={styles.characterCount}>Character count: {text.length}</Text>
        )}

        {message.length > 0 && (
            <Text style={styles.message}>{message}</Text>
        )}
        </View>
    )
}


const styles = StyleSheet.create({
  container: {
    width: '80%',
    alignItems: 'center',
  },

  inputText: {
    borderBottomColor: "purple",
    borderBottomWidth: 2,
    width: '100%',
    marginBottom: 10,
    padding: 5,
  },

  characterCount: {
    marginTop: 5,
    color: 'gray',
  },

  message: {
    marginTop: 10,
    color: 'black',
  }
});
