import { View, Text, Button, StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function PostMap() {
  const locations = [
    {
      latitude: 37.78825,
      longitude: -122.4324,
      title: "Location 1",
      description: "Description 1",
    },
    {
      latitude: 37.78925,
      longitude: -122.4314,
      title: "Location 2",
      description: "Description 2",
    },
    // Add more locations as needed
  ];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {locations.map((location, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.title}
            description={location.description}
            onPress={() =>
              Alert.alert("Marker Pressed", "You have pressed the marker.")
            }
          />
        ))}
      </MapView>
      <Text style={styles.text}>This is some text below the map</Text>
      <Button title="Press Me" onPress={() => console.log("Button Pressed")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1, // You can adjust this to change the map's size
  },
  text: {
    textAlign: "center",
    padding: 10,
  },
});
