import React from 'react'
import { useState } from 'react'
import { TextInput, Text, Button, View, Modal, StyleSheet  } from 'react-native';

export default function Input({ focus, onConfirm, visible }) {
    const [text, setText] = useState("");
    const [count, setCount] = useState(0);
    const [isFocused, setIsFocused] = useState(focus);
    
    const handleConfirm = () => {
        console.log(text);
        onConfirm(text);
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
        >
        <View style={styles.container}>
            <TextInput
            placeholder="Type something here"
            autoCorrect={true}
            keyboardType="default"
            value={text}
            style={{ borderBottomColor: "purple", borderBottomWidth: 2 }}
            onChangeText={(changedText) => {
                setText(changedText);
                setCount(changedText.length);
            }}
            autoFocus={focus}
            onFocus={() => setIsFocused(true)}
            onSubmitEditing={() => setIsFocused(false)}
        />
        {isFocused ? (
            count > 0 ? <Text>Number of Characters: {count}</Text> : null
        ) : (
            count < 3 ? <Text>Please type more than 3 characters</Text> : <Text>Thank you</Text>
        )}
        <Button title="Confirm" onPress={handleConfirm} /> 
        </View>
    </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    });