import {Text, View, StyleSheet, Image, SafeAreaView, Button} from "react-native"
import {PAGE_IDS} from "../../util/constants"
import DemoBox from "../DemoBox"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
})

export default function Home({pageChangeStrategy}) {
  return <View style={styles.container}>
    <DemoBox name="Nav Buttons">
      <Button onPress={() => pageChangeStrategy(PAGE_IDS.INFO)} title="Info"/>
      <Button onPress={() => pageChangeStrategy(PAGE_IDS.TRANSLATOR)} title="Translator"/>
      <Button onPress={() => pageChangeStrategy(PAGE_IDS.MAP)} title="Map"/>
      <Button onPress={() => pageChangeStrategy(PAGE_IDS.FAQ)} title="FAQ"/>
      <Button onPress={() => pageChangeStrategy(PAGE_IDS.COMPASS)} title="Compass"/>
    </DemoBox>
  </View>
}
