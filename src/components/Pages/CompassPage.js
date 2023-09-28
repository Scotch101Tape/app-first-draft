import { StyleSheet, View, Text, Image, useWindowDimensions } from 'react-native';
import { useState, useEffect } from 'react';
import Navbar from '../Navbar'
import Compass from '../Compass';
import DemoBox from '../DemoBox';
import Requires from '../Requires';
import MyStatusBar from '../MyStatusBar';
import { getNextPrayerTime, getPrayerTimes } from '../../util/prayerTimes';
import { getQibla } from '../../util/qibla';
import { getRotateRadians, getReading, getRotate } from '../../util/compass';
import {C, R, Container} from "../layout"
import { Magnetometer } from 'expo-sensors';

const MIN_UPDATE_INTERVAL = 200

export default function CompassPage({pageChangeStrategy, pageId, location}) {
  /* TODO: make this less choppy
  I think animations seem pretty promising:
  https://reactnative.dev/docs/animations
  maybe continuously changing the "to" value
  */

  const [subscription, setSubscription] = useState(null)
  const [reading, setReading] = useState(null)
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();

  const subscribe = () => {
    setSubscription(
      Magnetometer.addListener((magnetometerData) => setReading(getReading(magnetometerData)))
    )
  }

  const unsubscribe = () => {
    if (subscription) {
      subscription.remove()
    }
    setSubscription(null)
  }

  useEffect(() => {
    subscribe()
    return () => unsubscribe()
  }, [])

  Magnetometer.setUpdateInterval(MIN_UPDATE_INTERVAL)

  let nextPrayerTime = null
  let qibla = null
  if (location) {
    const {latitude, longitude} = location.coords
    nextPrayerTime = getNextPrayerTime({latitude, longitude})
    qibla = getQibla({latitude, longitude})
  }

  // beware... magic numbers..
  const compassCenter = {x: windowWidth * 0.5, y: windowHeight * 0.55}
  const northSize = windowWidth * 1.20
  const meccaSize = northSize * 0.44

  const compassStyles = StyleSheet.create({
    mecca: {
      position: "absolute",
      width: meccaSize,
      height: meccaSize,
      left: compassCenter.x - meccaSize / 2,
      top: compassCenter.y - meccaSize / 2,
      transform: [{rotate: getRotate({pointsTo: qibla, reading}) + 90 + "deg"}]
    },
    north: {
      position: "absolute",
      width: northSize,
      height: northSize,
      left: compassCenter.x - northSize / 2,
      top: compassCenter.y - northSize / 2,
      transform: [{rotate: getRotate({pointsTo: 0, reading}) + "deg"}]
    },
    centerInfo: {
      position: "absolute",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width: 100,
      height: 100,
      left: compassCenter.x - 50,
      top: compassCenter.y - 50,
    },
  })

  function CompassText({pointsTo, text}) {
    const style = {
      position: "absolute",
      left: compassCenter.x + (northSize * 0.36 + 10) * Math.cos(getRotateRadians({pointsTo, reading})) - 25,
      top: compassCenter.y + (northSize * 0.36 + 10) * Math.sin(getRotateRadians({pointsTo, reading})) - 25,
      width: 50,
      height: 50,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }

    return <View style={style}>
      <Text style={{fontSize: 50, color: "white", fontWeight: "bold"}}>{text}</Text>
    </View>
  }

  return <Container>
    <Image source={require("../../../assets/page-specific/compass/Background.png")} style={{position: "absolute", height: "100%", width: "100%", left: 0, right: 0, resizeMode: "cover"}}/>
    <MyStatusBar backgroundColor={"black"}/>
    <Image style={compassStyles.north} source={require("../../../assets/page-specific/compass/NorthCompassPointer.png")}/>
    <Image style={compassStyles.mecca} source={require("../../../assets/page-specific/compass/MeccaCompassPointer.png")}/>
    <CompassText text={"N"} pointsTo={0}/>
    <CompassText text={"E"} pointsTo={90}/>
    <CompassText text={"S"} pointsTo={180}/>
    <CompassText text={"W"} pointsTo={270}/>
    <View style={compassStyles.centerInfo}>
      <Text style={{fontWeight: "bold", fontSize: 30, color: "black"}}>DEMO</Text>
      <View style={{width: "80%", height: 3, backgroundColor: "black"}}></View>
      <Text style={{fontWeight: "bold", fontSize: 30, color: "black"}}>TEXT</Text>
    </View>
    <R>
      <View style={{height: 100, flex: 1, flexDirection: "column-reverse"}}>
        <View style={{height: 3, backgroundColor: "white"}}/>
        <Text style={{marginLeft: 5, fontSize: 30, color: "white", fontWeight: "bold"}}>Qibla Compass</Text>
      </View>
      <View style={{width: 40}}/>
      <C style={{padding: 10, marginTop: 10, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, backgroundColor: "white", height: 90}}>
        <Text style={{fontWeight: "bold", fontSize: 20}}>Next prayer time:</Text>
        <Text style={{fontWeight: "bold", fontSize: 30, marginTop: -3}}>{nextPrayerTime}</Text>
      </C>
    </R>
    <Navbar pageChangeStrategy={pageChangeStrategy} pageId={pageId}/>
  </Container>
}
