import { StyleSheet, View, Button, Text, Image, ScrollView, Pressable, FlatList, useWindowDimensions } from 'react-native';
import Navbar from '../Navbar'
import DemoBox from '../DemoBox';
import { useState, useRef, useEffect } from 'react';
import { CODES, findPlaces, findPlacesTest } from '../../util/places';
import Requires from '../Requires';
import { Container, Background , R, C, centerStyle} from '../layout';
import MyStatusBar from '../MyStatusBar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

function Item({dump}) {
  const {width: windowWidth, height: windowHeight} = useWindowDimensions()

  return <View style={{width: windowWidth - 20, height: 70, marginBottom: 20, marginLeft:10, marginRight: 10, overflow: "hidden", backgroundColor: "white"}}>
    <Text>{JSON.stringify(dump)}</Text>
  </View>
}

export default function InfoPage({pageChangeStrategy, pageId, location}) {
  /*
  request && !loading: undisplay results, undisplay retry, display loading, display which one is being loaded
    -> good results: display results, undisplay loading
    -> bad results: display retry, undisplay loading

  request && loading

  On start: send request
  */

  const [loading, setLoading] = useState(true)
  const [pressed, setPressed] = useState(null)
  const [retry, setRetry] = useState(null)
  const [results, setResults] = useState(null)
  const fetching = useRef(null)

  function findPlacesRoutine({code}) {
    if ((pressed !== code && fetching.current !== code) || retry) {
      fetching.current = code
      setLoading(true)
      setRetry(false)
      setResults(null) // TODO change this so I put results in store to be passed around app..
      setPressed(code)

      findPlaces({code, location: [location.coords.latitude, location.coords.longitude]})
      .then(dump => {
        if (fetching.current === code) {
          setResults(dump)
          setLoading(false)
        }
      })
      .catch(error => {
        console.warn(error)
        if (fetching.current === code) {
          setRetry(true)
          setLoading(false)
        }
      })
    }
  }

  useEffect(() => {
    findPlacesRoutine({code: CODES.RESTAURANT})
  }, [])

  function onPressFind({code}) {
    findPlacesRoutine({code})
  }

  function FindButton({code, text}) {
    return <Pressable style={{marginRight: 10}} onPress={() => onPressFind({code})}>
      <C style={[centerStyle, {padding: 5, borderRadius: 25 /* equal to this padding plus the inside's border radius*/, borderColor: code === pressed ? "white" : (0, 0, 0, 0), borderWidth: 1}]}>
        <C style={{justifyContent: "center", alignItems: "center", borderRadius: 20, backgroundColor: "white", padding: 10}}>
          <Text style={{fontWeight: "bold", fontSize: 20}}>{text}</Text>
        </C>
      </C>
    </Pressable>
  }

  function Retry() {
    return <View>
      <Text>Retry {fetching.current}</Text>
      <Button title={"here"} onPress={() => onPressFind({code: fetching.current})}/>
    </View>
  }

  function Loading() {
    return <View><Text>Loading {fetching.current}</Text></View>
  }

  function Places() {
    return <View>
      <FlatList
        data={results}
        renderItem={itemDump => <Item dump={itemDump}/>}
        keyExtractor={itemDump => Math.round(Math.random() * 1e10)}
      />
    </View>
  }

  let ComponentShown
  if (loading) {
    ComponentShown = Loading
  } else if (retry) {
    ComponentShown = Retry
  } else if (results !== null) {
    ComponentShown = Places
  } else {
    throw "WHAT"
  }

  return <Container style={{flexDirection:"column-reverse"}}>
    <Background source={require("../../../assets/page-specific/info/Background.png")}/>
    <C grow={80}>
      <ComponentShown/>
    </C>
    {/*<Image source={require("../../../assets/page-specific/info/TopFade.png")} style={{position: "absolute", top: 0, width: "100%", resizeMode: "stretch"}}></Image>*/}
    <View style={{height: 60, width: "100%"}}>
      <Text style={{fontWeight: "bold", color: "white", fontSize: 30, marginLeft: 10}}>Near you:</Text>
      <View style={{height: 2, width: 160, backgroundColor: "white", marginTop: 3}}></View>
    </View>
    <View style={{flexGrow: 0, width: "100%", height: 80 }}>
      <ScrollView style={{padding: 10}} horizontal={true} showsHorizontalScrollIndicator={false}>
        <R style={{justifyContent: "space-around", alignItems: "center"}}>
          <FindButton text={"Halal Restaurants"} code={CODES.RESTAURANT}/>
          <FindButton text={"Halal Grocery"} code={CODES.GROCERY}/>
          <FindButton text={"Islamic Clothing"} code={CODES.CLOTHING}/>
          <FindButton text={"Mosques"} code={CODES.MOSQUE}/>
        </R>
      </ScrollView>
    </View>
    <MyStatusBar backgroundColor={"black"}/>
    <Image source={require("../../../assets/page-specific/info/BottomFade.png")} style={{position: "absolute", bottom: 0, width: "100%", resizeMode: "stretch"}}></Image>
    <Navbar pageChangeStrategy={pageChangeStrategy} pageId={pageId}/>
  </Container>

  {/*<View style={styles.container}>

    <DemoBox name="Selection Buttons">
      <Requires requisites={[location]} failureMessage={"Requires locations permissions"}>
        <Button title="Find Halal Restaurants" onPress={() => onPressFind({code: CODES.RESTAURANT})}/>
        <Button title="Find Halal Grocery" onPress={() => onPressFind({code: CODES.GROCERY})}/>
        <Button title="Find Mosques" onPress={() => onPressFind({code: CODES.MOSQUE})}/>
        <Button title="Find Halal Clothing" onPress={() => onPressFind({code: CODES.CLOTHING})}/>
      </Requires>
    </DemoBox>
    <DemoBox name="Places">
      <Text>{places}</Text>
    </DemoBox>
    <Navbar pageChangeStrategy={pageChangeStrategy} pageId={pageId}/>
  </View>
*/}
}
