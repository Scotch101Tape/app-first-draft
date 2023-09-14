import { StyleSheet, View, Button, Text } from 'react-native';
import Navbar from '../Navbar'
import DemoBox from '../DemoBox';
import { useState, useRef } from 'react';
import { CODES, findPlaces } from '../../util/places';
import Requires from '../Requires';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default function InfoPage({pageChangeStrategy, pageId, location}) {
  const [places, setPlaces] = useState("No places yet")
  let currentCode = useRef(null) //used to make sure that only the most recent button clicked displays results

  function onPressFind({code}) {
    if (currentCode.current !== code) {
      const pastCode = currentCode.current
      const pastPlaces = places
      currentCode.current = code
      setPlaces("loading places")
      findPlaces({code, location: [location.coords.latitude, location.coords.longitude]})
        .then(dump => {
          setPlaces(JSON.stringify(dump))
        })
        .catch(error => {
          console.error(error)
          currentCode.current = pastCode
          setPlaces(pastPlaces)
        })
    }
  }

  return <View style={styles.container}>
    <DemoBox name="Selection Buttons">
      <Requires requisites={[location]} failureMessage={"Requires locations permissions"}>
        <Button title="Find Halal Restaurants" onPress={() => onPressFind({code: CODES.RESTAURANT})}/>
        <Button title="Find Halal Grocery" onPress={() => onPressFind({code: CODES.GROCERY})}/>
        <Button title="Find Mosques" onPress={() => onPressFind({code: CODES.MOSQUE})}/>
      </Requires>
    </DemoBox>
    <DemoBox name="Places">
      <Text>{places}</Text>
    </DemoBox>
    <Navbar pageChangeStrategy={pageChangeStrategy} pageId={pageId}/>
  </View>
}
