import { View, StyleSheet, Text, Button } from "react-native"
import DemoBox from "./DemoBox"
import { PAGE_IDS } from '../util/constants'

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 10,
    flex: 1,
    width: "100%"
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
})

export default function Navbar({pageChangeStrategy, pageId}) {
  return <View style={styles.container}>
    <DemoBox name="Nav Bar">
      <View style={styles.buttonContainer}>
        <Text>Current Page: {pageId}</Text>
        <Button title="Home" onPress={() => pageChangeStrategy(PAGE_IDS.HOME)}/>
        <Button title="Compass" onPress={() => pageChangeStrategy(PAGE_IDS.COMPASS)}/>
        <Button title="Info" onPress={() => pageChangeStrategy(PAGE_IDS.INFO)}/>
        <Button title="Map" onPress={() => pageChangeStrategy(PAGE_IDS.MAP)}/>
        <Button title="Translator" onPress={() => pageChangeStrategy(PAGE_IDS.TRANSLATOR)}/>
      </View>
    </DemoBox>
  </View>
}
