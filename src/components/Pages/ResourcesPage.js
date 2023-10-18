import { StyleSheet, View, Button, Pressable, Text, ScrollView, Image, Animated, Platform, UIManager, LayoutAnimation, SectionList, useWindowDimensions } from 'react-native';
import { Children, useRef, useState, useEffect } from 'react';
import DemoBox from '../DemoBox';
import { PAGE_IDS } from '../../util/constants';
import Navbar from '../Navbar';
import { R, C, Container, Bold, Circle, Rect, Nothing, randomKey } from "../layout"
import MyStatusBar from '../MyStatusBar';
import { WebView } from 'react-native-webview';
import Link from '../Link';

// Adapted from https://reactnative.dev/docs/layoutanimation.html
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const DROP_DOWN_MODE = {
  MINI: 1,
  MAX: 2,
}

function DropDown({title, children, initialState}) {
  const IMAGES = {
    ARROW: require("../../../assets/page-specific/resources/DownArrow.png"),
  }

  const [mode, setMode] = useState(initialState || DROP_DOWN_MODE.MINI)

  // Animations
  const arrowRotation = useRef(new Animated.Value(mode === DROP_DOWN_MODE.MINI ? 0 : 180)).current

  // Adapted from https://stackoverflow.com/a/37445916
  const arrowRotationStyle = arrowRotation.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"]
  })

  // const content = Children.toArray(children).map(jsx =>
  //   <R key={randomKey()} style={{alignItems: "center", paddingBottom: 3}}>
  //     <Circle color="black" radius={3}/>
  //     <Rect width={3}/>
  //     {jsx}
  //   </R>
  // )

  const onPress = () => {
    arrowRotation.setValue(mode === DROP_DOWN_MODE.MINI ? 0 : 180)
    Animated.timing(arrowRotation, {
      toValue: mode === DROP_DOWN_MODE.MINI ? 180 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start()

    LayoutAnimation.configureNext({
      duration: 700,
      create: {type: 'easeIn', property: 'opacity'},
      update: {type: 'spring', springDamping: 1},
    })

    mode === DROP_DOWN_MODE.MINI ? setMode(DROP_DOWN_MODE.MAX) : setMode(DROP_DOWN_MODE.MINI)
  }

  return <C style={{backgroundColor: "white", margin: 10, borderRadius: 20}}>
    <Pressable onPress={onPress} style={{flexDirection: "row", padding: 10, paddingVertical: 15, paddingBottom: mode === DROP_DOWN_MODE.MINI ? undefined : 10, alignItems: "center", justifyContent: "space-between"}}>
      <Bold style={{fontSize: 18}}>
        {title}
      </Bold>
      <Animated.Image source={IMAGES.ARROW} style={{transform: [{rotate: arrowRotationStyle}]}}/>
    </Pressable>
    {mode === DROP_DOWN_MODE.MAX && <C style={{padding: 10, paddingTop: -5}}>
      {children}
    </C>}
  </C>
}

function Heading({children}) {
  return <Bold style={{paddingVertical: 5}}>{children}</Bold>
}

function BulletPoint({children}) {
  return <R style={{alignItems: "center", paddingLeft: 10, paddingBottom: 5}}>
    <Circle color="black" radius={3}/>
    <Rect width={3}/>
    {children}
  </R>
}

export default function ResourcesPage({data, setData}) {
  const {height: windowHeight} = useWindowDimensions()

  return <Container style={{backgroundColor: "#DCDADB"}}>
    <MyStatusBar backgroundColor="black"/>
    <Rect height={15}/>
    <Bold style={{fontSize: 30, paddingLeft: 10}}>Resources موارد</Bold>
    <Rect width={250} height={3} color={"black"}/>
    <Rect height={10}/>

    <ScrollView>
      <DropDown title="Helpful Links روابط مفيدة" initialState={DROP_DOWN_MODE.MAX}>
        <Heading>Resettlement Agencies وكالات إعادة التوطين</Heading>
        <BulletPoint>
          <Link url="https://www.rescue.org/">rescue.org</Link>
        </BulletPoint>
        <BulletPoint>
          <Link url="https://refugees.org/">refugees.org</Link>
        </BulletPoint>
        <Heading>Legal Aid مساعدة قانونية</Heading>
        <BulletPoint>
          <Link url="https://immigrantjustice.org/immigrants">immigrantjustice.org</Link>
        </BulletPoint>
        <Heading>Employment Services خدمات التوظيف</Heading>
        <BulletPoint>
          <Link url="https://www.upwardlyglobal.org/">upwardlyglobal.org</Link>
        </BulletPoint>
        <Heading>Government Resources الموارد الحكومية</Heading>
        <BulletPoint>
          <Link url="https://www.state.gov/refugee-admissions/">state.gov/refugee-admissions</Link>
        </BulletPoint>
        <Heading>UNHCR مفوضية شؤون اللاجئين</Heading>
        <BulletPoint>
          <Link url="https://www.unhcr.org/us/">unhcr.org/us</Link>
        </BulletPoint>
      </DropDown>
      <DropDown title="Crescent Wear لبس الهلال" initialState={DROP_DOWN_MODE.MINI}>
        <R style={{alignItems: "center", justifyContent: "center"}}>
          <Link url="https://crescentwear.com/">
            <Bold style={{fontSize: 20, padding: 10, color: "blue"}}>crescentwear.com</Bold>
          </Link>
        </R>
        <WebView
          source={{uri: "https://crescentwear.com/"}}
          style={{height: windowHeight - 300, width: "100%", borderRadius: 10}}
        />
      </DropDown>
    </ScrollView>
    <Rect height={60}/>
    <Navbar pageId={data.pageId} setPageId={pageId => setData({...data, pageId})}/>
  </Container>
}
