import { View, StyleSheet, Text, Button } from "react-native"
import DemoBox from "./DemoBox"
import { PAGE_IDS } from '../util/constants'

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: "auto",
    right: "auto",
    flex: 1,
  }
})

export default function Navbar({pageChangeStrategy, pageId}) {
  return <View style={styles.container}>
    <DemoBox name="Nav Bar">
      <Text>Current Page: {pageId}</Text>
      <Button title="Home" onPress={() => pageChangeStrategy(PAGE_IDS.HOME)}/>
      <Button title="Compass" onPress={() => pageChangeStrategy(PAGE_IDS.COMPASS)}/>
      <Button title="Info" onPress={() => pageChangeStrategy(PAGE_IDS.INFO)}/>
      <Button title="Map" onPress={() => pageChangeStrategy(PAGE_IDS.MAP)}/>
      <Button title="Translator" onPress={() => pageChangeStrategy(PAGE_IDS.TRANSLATOR)}/>
    </DemoBox>
  </View>
}
