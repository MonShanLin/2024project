import React, { useState } from 'react';
import { TextInput, Text, Button, View, Modal, StyleSheet, Alert } from 'react-native';

export default function Input({ focus, onConfirm, onCancel, visible }) {
    const [text, setText] = useState("");
    const [count, setCount] = useState(0);
    const [isFocused, setIsFocused] = useState(focus);

    const handleConfirm = () => {
        console.log(text);  
        onConfirm(text);
    };

    const handleCancel = () => {
        Alert.alert(
            'Cancel',
            'Are you sure you want to cancel?',
            [
                { text: 'No', style: 'cancel' },
                { text: 'OK', onPress: () => onCancel() }, 
            ],
            { cancelable: true }
        );
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
                    style={styles.input}
                    onChangeText={(changedText) => {
                        setText(changedText);
                        setCount(changedText.length);
                    }}
                    autoFocus={focus}
                    onFocus={() => setIsFocused(true)}
                    onSubmitEditing={() => setIsFocused(false)}
                />
                {isFocused ? (
                    count > 0 ? <Text style={styles.text}>Number of Characters: {count}</Text> : null
                ) : (
                    count < 3 ? <Text style={styles.text}>Please type more than 3 characters</Text> : <Text style={styles.text}>Thank you</Text>
                )}
                <View style={styles.buttonContainer}>
                    <Button title="Confirm" onPress={handleConfirm} />
                </View>

                <View style={styles.buttonContainer}>
                    <Button title="Cancel" onPress={handleCancel} />
                </View>
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
        paddingHorizontal: 20, 
    },
    input: {
        width: '80%',
        borderColor: 'darkorchid',
        borderWidth: 2,  
        padding: 5,  
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        color: 'purple',
        marginVertical: 10,
    },
    buttonContainer: {
        width: '40%',  
        marginTop: 20,
    },
});