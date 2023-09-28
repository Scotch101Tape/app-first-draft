import {Text, View, StyleSheet, Image, SafeAreaView, Button, StatusBar, Pressable} from "react-native"
import {PAGE_IDS} from "../../util/constants"
import DemoBox from "../DemoBox"
import MyStatusBar from '../MyStatusBar'
import { Container, R, C } from '../layout'

const dotted = {
  borderColor: "black",
  borderStyle: "dotted",
  borderWidth: 3,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  /*content: {
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
    flexDirection: "column"
  },
  footer: {
    flexGrow: 5,
  },*/
  button: {
    flex: 1,
    /*justifyContent: "center",
    alignItems: "center",*/
    flexGrow: 1,
    padding: 10,
    position: "relative"
  },
  imageInButton: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
    position: "absolute",
    margin: 10,
  },
})

export default function Home({pageChangeStrategy}) {
  function HomePageButton({pageId, children}) {
    return <Pressable style={{flex: 1, padding: 10, position: "relative"}} onPress={() => pageChangeStrategy(pageId)}>
      {children}
    </Pressable>
  }

  return <Container>
    <Image source={require("../../../assets/page-specific/home/Backsplash.png")} style={{position: "absolute", height: "55%", width: "100%", left: 0, right: 0, resizeMode: "cover"}}/>
    <MyStatusBar backgroundColor={"black"}/>
    <C>
      <C grow={44} style={{alignItems: "center", justifyContent: "center"}}>
        <Image source={require("../../../assets/page-specific/home/Logo.png")} style={{height: 200, resizeMode: "contain"}}/>
      </C>
      <C grow={9} style={{justifyContent: "center", alignItems: "center"}}>
        <Image source={require("../../../assets/page-specific/home/MerhabaText.png")} style={{height: 35, resizeMode: "contain"}}/>
      </C>
      <C grow={45}>
        <R grow={55}>
          <C>
            <HomePageButton pageId={PAGE_IDS.INFO}>
              <Image style={styles.imageInButton} source={require("../../../assets/page-specific/home/InfoButton.png")}/>
              <R style={{width: "100%", justifyContent: "center", alignItems: "center"}}>
                <Image style={{margin: 5}} source={require("../../../assets/icons/white/Info.png")}/>
                <Text style={{color: "white", fontWeight: "bold", fontSize: 15, margin: 5}}>Info Page</Text>
              </R>
            </HomePageButton>
            <HomePageButton pageId={PAGE_IDS.TRANSLATOR}>
              <Image style={styles.imageInButton} source={require("../../../assets/page-specific/home/TranslatorButton.png")}/>
              <R style={{width: "100%", justifyContent: "center", alignItems: "center"}}>
                <Image style={{margin: 5}} source={require("../../../assets/icons/white/Translator.png")}/>
                <Text style={{color: "white", fontWeight: "bold", fontSize: 15, margin: 5}}>Translator</Text>
              </R>
            </HomePageButton>
          </C>
          <HomePageButton pageId={PAGE_IDS.MAP}>
            <Image style={styles.imageInButton} source={require("../../../assets/page-specific/home/MapButton.png")}/>
            <C style={{width: "100%", justifyContent: "center", alignItems: "center"}}>
              <Text style={{color: "white", fontWeight: "bold", fontSize: 25, margin: 5}}>Map</Text>
              <Image style={{margin: 5}} source={require("../../../assets/icons/white/Map.png")}/>
            </C>
          </HomePageButton>
        </R>
        <R grow={45}>
          <HomePageButton pageId={PAGE_IDS.FAQ}>
            <Image style={styles.imageInButton} source={require("../../../assets/page-specific/home/BottomButton.png")}/>
            <C style={{width: "100%", justifyContent: "center", alignItems: "center"}}>
              <Text style={{color: "white", fontWeight: "bold", fontSize: 15, margin: 5}}>About Us</Text>
              <Image style={{margin: 5}} source={require("../../../assets/icons/white/FAQ.png")}/>
            </C>
          </HomePageButton>
          <HomePageButton pageId={PAGE_IDS.RESOURCES}>
            <Image style={styles.imageInButton} source={require("../../../assets/page-specific/home/BottomButton.png")}/>
            <C style={{width: "100%", justifyContent: "center", alignItems: "center"}}>
              <Text style={{color: "white", fontWeight: "bold", fontSize: 15, margin: 5}}>Resources</Text>
              <Image style={{margin: 5}} source={require("../../../assets/icons/white/Resources.png")}/>
            </C>
          </HomePageButton>
          <HomePageButton pageId={PAGE_IDS.COMPASS}>
            <Image style={styles.imageInButton} source={require("../../../assets/page-specific/home/BottomButton.png")}/>
            <C style={{width: "100%", justifyContent: "center", alignItems: "center"}}>
              <Text style={{color: "white", fontWeight: "bold", fontSize: 15, margin: 5}}>Compass</Text>
              <Image style={{margin: 5}} source={require("../../../assets/icons/white/Compass.png")}/>
            </C>
          </HomePageButton>
        </R>
        {/*<View style={{flex: 1, flexGrow: 1}}>
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
</View>*/}

      </C>
      <C grow={2}/>
    </C>
  </Container>
}
