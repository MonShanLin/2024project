import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';

export default function LocationManager() {
  const [location, setLocation] = useState(null);
  const [permissionResponse, requestPermission] = Location.useForegroundPermissions();

  // Function to check permissions
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
    // Verify permissions before attempting to get the location
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }

    try {
      // Get the current location
      const userLocation = await Location.getCurrentPositionAsync();
      setLocation(userLocation);
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
