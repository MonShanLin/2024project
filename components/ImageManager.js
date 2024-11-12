import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImageManager({ onImageTaken }) {
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [permissionResponse, requestPermission] = ImagePicker.useCameraPermissions();

  const verifyPermission = async () => {
    if (permissionResponse.granted) {
      return true;
    }
    const result = await requestPermission();
    return result.granted;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      Alert.alert('Permission Required', 'Camera permission is needed to take photos.');
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setSelectedImageUri(uri);
        onImageTaken(uri); // Pass URI to parent component
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      Alert.alert('Error', 'Unable to access the camera');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Take Photo" onPress={takeImageHandler} />
      {selectedImageUri && (
        <Image source={{ uri: selectedImageUri }} style={styles.image} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
});