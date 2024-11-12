import React, { useState } from 'react';
import { View, Button, Image, Text, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

const GOOGLE_MAPS_API_KEY = "AIzaSyDUek3GBIBdIU5NKdcInNPC5huDxCXv7_U";

export default function LocationManager() {
  const [location, setLocation] = useState(null);
  const [permissionResponse, requestPermission] = Location.useForegroundPermissions();
  const navigation = useNavigation(); // Access the navigation prop

  const verifyPermission = async () => {
    if (permissionResponse?.granted) {
      return true;
    }

    const { granted } = await requestPermission();
    if (!granted) {
      Alert.alert('Permission Denied', 'Location access is required to locate you.');
      return false;
    }

    return true;
  };

  const locateUserHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }

    try {
      const userLocation = await Location.getCurrentPositionAsync();
      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });
    } catch (err) {
      console.error('Error fetching location:', err);
      Alert.alert('Error', 'Unable to fetch location.');
    }
  };

  const mapUrl = location ? 
    `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}` 
    : null;

  return (
    <View style={styles.container}>
      <Button title="Locate Me" onPress={locateUserHandler} />
      {location && (
        <>
          <Text>Latitude: {location.latitude}</Text>
          <Text>Longitude: {location.longitude}</Text>
          <Image source={{ uri: mapUrl }} style={styles.mapImage} />
          <Button
            title="View on Map"
            onPress={() => navigation.navigate('Map', { latitude: location.latitude, longitude: location.longitude })}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  mapImage: {
    width: 400,
    height: 200,
    marginTop: 10,
  },
});