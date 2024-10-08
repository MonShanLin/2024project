import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';

export default function PressableButton({ onPress, style, children }) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: 'pink' }}
      style={({ pressed }) => [
        styles.button,
        pressed ? styles.pressed : null, 
        style, 
      ]}
    >
      <View>
        {children} 
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
  },

  pressed: {
    opacity: 0.7,
  },
});
