import { StyleSheet, Text, View } from "react-native"
import { useEffect, useState } from "react"
import * as Location from "expo-location"

import InfoMap from "./components/InfoMap"
import SlideView from "./components/SlideView"
import Slide from "./components/Slide"
import PrayerTimes from "./components/PrayerTimes"
import Requires from "./components/Requires"

const SLIDE_IDS = {
  PRAYER_TIMES: "prayer-times",
  TRANSLATE: "translate",
  MAP: "map",
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  map: {
    width: "100%",
    height: "100%",
  }
})

export default function _App() {
  const [location, setLocation] = useState(null)

  // Copied from the expo-location examples
  // https://docs.expo.dev/versions/latest/sdk/location/
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        return
      }

      let location = await Location.getLastKnownPositionAsync({
        precise: false,
      })
      setLocation(location)
    })()
  }, [])

  return (
    <View style={styles.container}>
      <SlideView barHeight={50} initialSlide={"map"}>
        <Slide name="Map" slideId={SLIDE_IDS.MAP}>
          <InfoMap style={styles.map}/>
        </Slide>
        <Slide name="Prayer Times" slideId={SLIDE_IDS.PRAYER_TIMES}>
          <Requires requisites={[location]} failureMessage={"This feature cannot be used without location data"}>
            <PrayerTimes location={location}/>
          </Requires>
        </Slide>
        <Slide name="Translate" slideId={SLIDE_IDS.TRANSLATE}>
          <Text>
            Translate
          </Text>
        </Slide>
      </SlideView>
    </View>
  )
}
