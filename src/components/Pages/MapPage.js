import MapView, {Geojson} from "react-native-maps"
import {View, StyleSheet} from "react-native"
import Navbar from '../Navbar'

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

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
  }
})

export default function MapPage({pageChangeStrategy, pageId}) {
  return <View style={styles.container}>
    <MapView style={styles.map} />
    <Navbar pageChangeStrategy={pageChangeStrategy} pageId={pageId}/>
  </View>
}
