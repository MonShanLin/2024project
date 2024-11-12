import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

export default function Map({ route }) {
  const { latitude, longitude } = route.params || { latitude: 37.78825, longitude: -122.4324 }; // default coordinates if none are passed
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigation = useNavigation();

  const selectLocationHandler = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  const handleConfirmLocation = () => {
    if (selectedLocation) {
      navigation.navigate('Profile', { location: selectedLocation });
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={selectLocationHandler}
      >
        {selectedLocation && (
          <Marker
            coordinate={selectedLocation}
            title="Selected Location"
          />
        )}
      </MapView>
      <Button
        title="Confirm Location"
        onPress={handleConfirmLocation}
        disabled={!selectedLocation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});