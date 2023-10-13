import { StyleSheet, View, Button, Pressable, Text, ScrollView, Image, Animated, Platform, UIManager, LayoutAnimation } from 'react-native';
import { Children, useRef, useState, useEffect } from 'react';
import DemoBox from '../DemoBox';
import { PAGE_IDS } from '../../util/constants';
import Navbar from '../Navbar';
import { R, C, Container, Bold, Circle, Rect, Nothing, randomKey } from "../layout"
import MyStatusBar from '../MyStatusBar';

// Adapted from https://reactnative.dev/docs/layoutanimation.html
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

function DropDown({title, children}) {
  const MODES = {
    MINI: 1,
    MAX: 2,
  }

  const IMAGES = {
    ARROW: require("../../../assets/page-specific/resources/DownArrow.png"),
  }

  const [mode, setMode] = useState(MODES.MINI)

  // Animations
  const arrowRotation = useRef(new Animated.Value(mode === MODES.MINI ? 0 : 180)).current

  // Adapted from https://stackoverflow.com/a/37445916
  const arrowRotationStyle = arrowRotation.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"]
  })

  const content = Children.toArray(children).map(jsx =>
    <R key={randomKey()} style={{alignItems: "center", paddingBottom: 3}}>
      <Circle color="black" radius={3}/>
      <Rect width={3}/>
      {jsx}
    </R>
  )

  const onPress = () => {
    arrowRotation.setValue(mode === MODES.MINI ? 0 : 180)
    Animated.timing(arrowRotation, {
      toValue: mode === MODES.MINI ? 180 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start()

    LayoutAnimation.configureNext({
      duration: 700,
      create: {type: 'easeIn', property: 'opacity'},
      update: {type: 'spring', springDamping: 1},
      delete: {type: 'spring', springDamping: 0, property: 'opacity'}
    })

    mode === MODES.MINI ? setMode(MODES.MAX) : setMode(MODES.MINI)
  }

  return <C style={{backgroundColor: "white", margin: 10, borderRadius: 20, height: 100}}>
    <Pressable onPress={onPress} style={{flexDirection: "row", padding: 10, paddingVertical: 15, paddingBottom: mode === MODES.MINI ? undefined : 10, alignItems: "center", justifyContent: "space-between"}}>
      <Bold style={{fontSize: 18}}>
        {title}
      </Bold>
      <Animated.Image source={IMAGES.ARROW} style={{transform: [{rotate: arrowRotationStyle}]}}/>
    </Pressable>
    {mode === MODES.MAX && <C style={{padding: 10, paddingLeft: 20, paddingTop: -5}}>
      {content}
    </C>}
  </C>
}

export default function ResourcesPage({data, setData}) {
  return <Container style={{backgroundColor: "#DCDADB"}}>
    <MyStatusBar backgroundColor="black"/>
    <Rect height={15}/>
    <Bold style={{fontSize: 30, paddingLeft: 10}}>Resources موارد</Bold>
    <Rect width={250} height={3} color={"black"}/>
    <Rect height={10}/>
    <ScrollView>
      <DropDown title="More Maps المزيد من الخرائط">
        <Bold>1</Bold>
        <Bold>2</Bold>
        <Bold>3</Bold>
        <Bold>4</Bold>
        <Bold>5</Bold>
      </DropDown>
      <DropDown title="Immigration Resources موارد الهجرة">
        <Bold>1</Bold>
        <Bold>2</Bold>
        <Bold>3</Bold>
        <Bold>4</Bold>
        <Bold>5</Bold>
      </DropDown>
      <DropDown title="Mental Health الصحة النفسية">
        <Bold>1</Bold>
        <Bold>2</Bold>
        <Bold>3</Bold>
        <Bold>4</Bold>
        <Bold>5</Bold>
      </DropDown>
      <DropDown title="Miscellaneous شتيت">
        <Bold>1</Bold>
        <Bold>2</Bold>
        <Bold>3</Bold>
        <Bold>4</Bold>
        <Bold>5</Bold>
      </DropDown>
    </ScrollView>
    <Rect height={60}/>
    <Navbar pageId={data.pageId} setPageId={pageId => setData({...data, pageId})}/>
  </Container>
}
