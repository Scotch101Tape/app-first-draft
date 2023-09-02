import {Text, View, StyleSheet, Image, SafeAreaView, Button, StatusBar, Pressable} from "react-native"
import {PAGE_IDS} from "../../util/constants"
import DemoBox from "../DemoBox"
import MyStatusBar from '../MyStatusBar'

const dotted = {
  borderColor: "black",
  borderStyle: "dotted",
  borderWidth: 3,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    flex: 1,
  },
  logoContainer: {
    flexGrow: 45,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  titleContainer: {
    flexGrow: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexGrow: 40,
    flex: 1,
    flexDirection: "row"
  },
  footer: {
    flexGrow: 5,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    padding: 10,
  },
  imageInButton: {
    width: "100%",
    height: "100%",
    flexGrow: 1,
    resizeMode: "stretch",
  },
  textInButton: {
    position: "absolute",
    color: "white",
    fontSize: 25,
  },
  graphicInButton: {
    position: "absolute",
  }
})

export default function Home({pageChangeStrategy}) {
  return <View style={styles.container}>
    <Image source={require("../../../assets/Backsplash.png")} style={{position: "absolute", height: "55%", width: "100%", left: 0, right: 0, resizeMode: "cover"}}/>
    <MyStatusBar backgroundColor={"black"}/>
    <View style={styles.content}>
      <View style={styles.logoContainer}>
        <Image source={require("../../../assets/Logo.png")} style={{height: 200, resizeMode: "contain"}}/>
      </View>
      <View style={styles.titleContainer}>
        <Image source={require("../../../assets/MerhabaText.png")} style={{height: 35, resizeMode: "contain"}}/>
      </View>
      <View style={styles.buttonContainer}>
        <View style={{flex: 1, flexGrow: 1}}>
          <Pressable style={styles.button} onPress={() => pageChangeStrategy(PAGE_IDS.INFO)}>
            <Image style={styles.imageInButton} source={require("../../../assets/InfoButtonBackground.png")}/>
            <Text style={{...styles.textInButton, left: 60}}>Info Page</Text>
            <Image style={{...styles.graphicInButton, left: 30}} source={require("../../../assets/InfoGraphic.png")}/>
          </Pressable>
          <Pressable style={styles.button} onPress={() => pageChangeStrategy(PAGE_IDS.TRANSLATOR)}>
            <Image style={styles.imageInButton} source={require("../../../assets/TranslatorButtonBackground.png")}/>
            <Text style={{...styles.textInButton, left: 60}}>Translator</Text>
            <Image style={{...styles.graphicInButton, left: 30}} source={require("../../../assets/TranslatorGraphic.png")}/>
          </Pressable>
          <Pressable style={styles.button} onPress={() => pageChangeStrategy(PAGE_IDS.FAQ)}>
            <Image style={styles.imageInButton} source={require("../../../assets/FAQButtonBackground.png")}/>
            <Text style={{...styles.textInButton, left: 65}}>FAQ</Text>
            <Image style={{...styles.graphicInButton, left: 25, height: 30, resizeMode: "contain"}} source={require("../../../assets/FAQGraphic.png")}/>
          </Pressable>
        </View>
        <View style={{flex: 1, flexGrow: 1}}>
          <Pressable style={styles.button} onPress={() => pageChangeStrategy(PAGE_IDS.MAP)}>
            <Image style={styles.imageInButton} source={require("../../../assets/MapButtonBackground.png")}/>
            <Text style={{...styles.textInButton, left: 75}}>Map</Text>
            <Image style={{...styles.graphicInButton, left: 25}} source={require("../../../assets/MapGraphic.png")}/>
          </Pressable>
          <Pressable style={styles.button} onPress={() => pageChangeStrategy(PAGE_IDS.COMPASS)}>
            <Image style={styles.imageInButton} source={require("../../../assets/CompassButtonBackground.png")}/>
            <Text style={{...styles.textInButton, left: 70}}>Compass</Text>
            <Image style={{...styles.graphicInButton, left: 20}} source={require("../../../assets/CompassGraphic.png")}/>
          </Pressable>
        </View>
      </View>
      <View style={styles.footer}/>
    </View>
  </View>
}
