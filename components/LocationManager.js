import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';

export default function LocationManager() {
  const [location, setLocation] = useState(null);

  const locateUserHandler = async () => {
    try {
      // Ask for permission to access location
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location access is needed to locate you.');
        return;
      }

      // Get the current location
      const userLocation = await Location.getCurrentPositionAsync();
      setLocation(userLocation);
      console.log('Location:', userLocation);
    } catch (err) {
      console.error('Error fetching location:', err);
      Alert.alert('Error', 'Unable to fetch location.');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Locate Me" onPress={locateUserHandler} />
      {location && (
        <View style={styles.locationContainer}>
          <Text>Latitude: {location.coords.latitude}</Text>
          <Text>Longitude: {location.coords.longitude}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: 'center',
  },
  locationContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
});