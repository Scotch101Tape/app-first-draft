import {Text, View, StyleSheet} from "react-native"
import {timeNames, getPrayerTimes} from "../util/prayerTimes"

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    margin: 10,
  }
})

export default function PrayerTimes({location}) {
  const {latitude, longitude} = location.coords
  const prayerTimes = getPrayerTimes({latitude, longitude})
 // TODO: this,
 // i should put everything in a function

  return <View style={styles.container}>
       <Text>
        {JSON.stringify(prayerTimes)}
      </Text>
    </View>
}
