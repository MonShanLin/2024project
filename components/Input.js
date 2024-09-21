import React from 'react'
import { useState } from 'react'
import { TextInput } from 'react-native';

export default function Input({focus}) {
    const [text, setText] = useState("");
    
    return (
        <TextInput
            value={text}
            placeholder="Type something here"
            autoFocus={focus}
            autoCorrect={true} 
            keyboardType="default"
            style={{ borderBottomColor: "purple", borderBottomWidth: 2 }}
            onChangeText={(changedText) => {
                setText(changedText);    
            }}
        />
    )
}