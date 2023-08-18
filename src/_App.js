import { StyleSheet, Text, View } from "react-native"
import { useEffect, useState } from "react"
import * as Location from "expo-location"

import MapPage from "./components/Pages/MapPage"
import CompassPage from "./components/Pages/CompassPage"
import FaqPage from "./components/Pages/FaqPage"
import HomePage from "./components/Pages/HomePage"
import InfoPage from "./components/Pages/InfoPage"
import TranslatorPage from "./components/Pages/TranslatorPage"
import MultiPageView from './components/MultiPageView'
import { PAGE_IDS } from './util/constants'

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

const pages = [{

}]

export default function _App() {
  const [location, setLocation] = useState(null)
  const [pageId, setPageId] = useState(PAGE_IDS.HOME)

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

  const pageChangeStrategy = (newPageId) => {
    setPageId(newPageId)
  }

  // Boilerplate..
  // At the moment I have decided to write it in this way because I have come
  // to the conclution that when it comes to jsx, boilerplate is better than
  // weird map loop things
  return (
    <View style={styles.container}>
      <MultiPageView pageId={pageId}>
        <HomePage
          pageId={PAGE_IDS.HOME}
          pageChangeStrategy={pageChangeStrategy}
          location={location}
        />
        <CompassPage
          pageId={PAGE_IDS.COMPASS}
          pageChangeStrategy={pageChangeStrategy}
          location={location}
        />
        <FaqPage
          pageId={PAGE_IDS.FAQ}
          pageChangeStrategy={pageChangeStrategy}
          location={location}
        />
        <InfoPage
          pageId={PAGE_IDS.INFO}
          pageChangeStrategy={pageChangeStrategy}
          location={location}
        />
        <MapPage
          pageId={PAGE_IDS.MAP}
          pageChangeStrategy={pageChangeStrategy}
          location={location}
        />
        <TranslatorPage
          pageId={PAGE_IDS.TRANSLATOR}
          pageChangeStrategy={pageChangeStrategy}
          location={location}
        />
      </MultiPageView>
    </View>
  )
}
