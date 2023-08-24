import { StyleSheet, View, Text } from 'react-native';
import Navbar from '../Navbar'
import Compass from '../Compass';
import DemoBox from '../DemoBox';
import Requires from '../Requires';
import { getPrayerTimes } from '../../util/prayerTimes';
import { getQibla } from '../../util/qibla';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default function CompassPage({pageChangeStrategy, pageId, location}) {
  let prayerTimes = null
  let qibla = null
  if (location) {
    const {latitude, longitude} = location.coords
    prayerTimes = getPrayerTimes({latitude, longitude})
    qibla = getQibla({latitude, longitude})
  }

  return <View style={styles.container}>
    <DemoBox name="Compass pointing to Mecca">
      <Requires requisites={[location, qibla]} failureMessage="Location permissions needed">
        <Compass pointsTo={qibla}/>
      </Requires>
    </DemoBox>
    <DemoBox name="Prayer Times">
      <Requires requisites={[location, prayerTimes]} failureMessage="Location permissions needed">
        <Text>Prayer times {JSON.stringify(prayerTimes)}</Text>
      </Requires>
    </DemoBox>
    <DemoBox name="Daily Quote">
      <Text>Currently no daily quotes</Text>
    </DemoBox>
    <Navbar pageChangeStrategy={pageChangeStrategy} pageId={pageId}/>
  </View>
}
