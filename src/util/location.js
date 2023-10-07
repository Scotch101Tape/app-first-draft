import * as Location from "expo-location"

// From the expo-location examples
// https://docs.expo.dev/versions/latest/sdk/location/
// (License: MIT, https://github.com/expo/expo/blob/sdk-49/LICENSE)
export async function getLocation() {
  const {status} = await Location.requestForegroundPermissionsAsync()
  if (status !== "granted") {
    return null
  }

  const location = await Location.getLastKnownPositionAsync({
    precise: false,
  })

  return location
}

export function locationString(location) {
  return [location.coords.latitude, location.coords.longitude] + ""
}
