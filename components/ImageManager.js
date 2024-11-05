import React, { useState, useEffect } from 'react';
import { View, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImageManager() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);

  // Function to request camera permissions
  const requestPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    setHasCameraPermission(status === 'granted');
    return status === 'granted';
  };

  // Function to verify if permissions are granted
  const verifyPermissions = async () => {
    if (hasCameraPermission) {
      return true;
    }
    return await requestPermission();
  };

  // Function to handle taking an image
  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Camera permission is required to take photos.');
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log(result);

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      Alert.alert('Error', 'Unable to access the camera');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Take Photo" onPress={takeImageHandler} />
      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});
