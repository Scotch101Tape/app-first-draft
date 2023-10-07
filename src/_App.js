import { StyleSheet, Text, View } from "react-native"
import { useEffect, useState } from "react"
import { getLocation } from './util/location'

import MapPage from "./components/Pages/MapPage"
import CompassPage from "./components/Pages/CompassPage"
import FaqPage from "./components/Pages/FaqPage"
import HomePage from "./components/Pages/HomePage"
import InfoPage from "./components/Pages/InfoPage"
import TranslatorPage from "./components/Pages/TranslatorPage"
import ResourcesPage from './components/Pages/ResourcesPage'
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
  const [data, setData] = useState({
    location: null,
    pageId: PAGE_IDS.HOME,
    places: {}
  })

  useEffect(() => {
    // TODO: make sure the user lets me do this
    getLocation().then(location => setData({...data, location}))
  }, [])

  // Boilerplate..
  // At the moment I have decided to write it in this way because I have come
  // to the conclusion that when it comes to jsx, boilerplate is better than
  // weird map loop things
  return (
    <View style={styles.container}>
      <MultiPageView pageId={data.pageId}>
        <HomePage
          pageId={PAGE_IDS.HOME}
          data={data}
          setData={setData}
        />
        <CompassPage
          pageId={PAGE_IDS.COMPASS}
          data={data}
          setData={setData}
        />
        <FaqPage
          pageId={PAGE_IDS.FAQ}
          data={data}
          setData={setData}
        />
        <InfoPage
          pageId={PAGE_IDS.INFO}
          data={data}
          setData={setData}
        />
        <MapPage
          pageId={PAGE_IDS.MAP}
          data={data}
          setData={setData}
        />
        <TranslatorPage
          pageId={PAGE_IDS.TRANSLATOR}
          data={data}
          setData={setData}
        />
        <ResourcesPage
          pageId={PAGE_IDS.RESOURCES}
          data={data}
          setData={setData}
        />
      </MultiPageView>
    </View>
  )
}
