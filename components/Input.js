import React, { useState } from 'react';
import { TextInput, Text, Button, View, Modal, StyleSheet, Alert, Image } from 'react-native';

export default function Input({ focus, onConfirm, onCancel, visible }) {
    const [text, setText] = useState("");
    const [count, setCount] = useState(0);
    const [isFocused, setIsFocused] = useState(focus);
    const lengthRequired = 3; 

    const handleConfirmButton = () => {
        console.log(text);  
        onConfirm(text);
        setText("");
        setCount(0);
    };

    const handleCancelButton = () => {
        Alert.alert(
            'Alert',
            'Do you want to cancel?',
            [
                { text: 'No', style: 'cancel' },
                { text: 'OK', onPress: () => {
                    onCancel();
                    setText("");
                    setCount(0);
                }},
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
                                
                <Image 
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2617/2617812.png' }} 
                    style={styles.image} 
                    // alt is an alternative text description of the image to be read by the screen readers when they interacts with it
                    alt="Target Icon from Network"
                />
                
                <Image 
                    source={require('../assets/2617812.png')} 
                    style={styles.image} 
                    alt="Target Icon from Local"
                />

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
                    count < lengthRequired ? <Text style={styles.text}>Please type more than 3 characters</Text> : <Text style={styles.text}>Thank you</Text>
                )}
                <View style={styles.buttonHorizontal}>
                    <View style={styles.buttonContainer}>
                        <Button title="Confirm" onPress={handleConfirmButton} disabled={count < lengthRequired}/>
                    </View>
                    <View style={styles.buttonContainer}>
                         <Button title="Cancel" onPress={handleCancelButton} />
                    </View>
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
    buttonHorizontal: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    image: {
        width: 100,
        height: 100,
        margin: 10,
    },
});