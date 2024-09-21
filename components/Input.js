import React from 'react'
import { useState } from 'react'
import { TextInput } from 'react-native';

export default function Input() {
    const [text, setText] = useState("");
    
    return (
        <TextInput
            placeholder="Type something here"
            autoCorrect={true}
            keyboardType="default"
            style={{ borderBottomColor: "purple", borderBottomWidth: 2 }}
            onChangeText={(changedText) => {
                setText(changedText);
                value={text}
            }}
        />
    )
}