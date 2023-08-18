import { useState, useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Magnetometer } from 'expo-sensors';
import DemoBox from './DemoBox';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  compassImage: {
    width: 200,
    height: 200,
  }
})

// From https://github.com/rahulhaque/compass-react-native-expo/blob/master/App.js
// (License: MIT, https://github.com/rahulhaque/compass-react-native-expo/blob/master/LICENSE)
const angle = (magnetometerData) => {
  let angle = 0
  if (magnetometerData) {
    let {x, y} = magnetometerData
    if (Math.atan2(y, x) >= 0) {
      angle = Math.atan2(y, x) * (180 / Math.PI)
    } else {
      angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI)
    }
  }
  return Math.round(angle)
}

const MIN_UPDATE_INTERVAL = 200

export default function Compass({pointsTo}) {
  const [subscription, setSubscription] = useState(null)
  const [reading, setReading] = useState(0)

  const subscribe = () => {
    setSubscription(
      Magnetometer.addListener((magnetometerData) => setReading(angle(magnetometerData)))
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

  return <View style={styles.container}>
    <DemoBox name="Compass">
      <Image
        source={require("../../assets/compass.png")}
        style={Object.assign({}, styles.compassImage, {
          transform: [{rotate: 360 + 90 + pointsTo - reading + "deg"}]
        })}
      />
    </DemoBox>
  </View>
}
