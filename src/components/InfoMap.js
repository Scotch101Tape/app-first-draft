import MapView, {Geojson} from 'react-native-maps';

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

export default function InfoMap(props) {
  return <MapView style={props.style}>
    <Geojson
      geojson={myPlace}
      strokeColor="red"
      fillColor="green"
      strokeWidth={2}
    />
  </MapView>
}
