import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function Header( {name} ) {
    return (
        <View>
            <Text style={styles.text}>Welcome to {name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    text : {
        fontSize: 20,
        color: 'blue',
        borderColor: 'black',
        borderWidth: 1,
        padding: 5,
        marginBottom: 5,
    }
});