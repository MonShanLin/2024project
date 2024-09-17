import React from 'react'
import { useState } from 'react'
import { TextInput, Text, Button, View  } from 'react-native';

export default function Input({ focus, onConfirm }) {
    const [text, setText] = useState("");
    const [count, setCount] = useState(0);
    const [isFocused, setIsFocused] = useState(focus);
    
    const handleConfirm = () => {
        console.log(text);
        onConfirm(text);
    };

    return (
        <View>
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
    )
}