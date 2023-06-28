import { StyleSheet, Text, View } from "react-native"
import InfoMap from './components/InfoMap';

const myPlace = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [64.165329, 48.844287],
      }
    }
  ]
}

export default function _App() {
  return (
    <View style={styles.container}>
      <InfoMap style={styles.map}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  }
})
