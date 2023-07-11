import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native'

// Generate the bar style
function barStyle({barHeight}) {
  return StyleSheet.create({
    width: '100%',
    height: barHeight,

    position: 'fixed',
    fontSize: 60, //TODO: make this different
    bottom: 0,
    top: 'auto',
    left: 0,
    right: 0,

    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',

    backgroundColor: 'grey',
  })
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'purple',
    flex: 1,
  },
  slideButton: {
    // TODO: change color
  }
})

export default function SlideView({children, initialSlide, barHeight}) {
  // the current slide id
  const [slide, setSlide] = useState(initialSlide)

  // pick which slide to display
  let childDisplayed = children.filter(child => {
    return child.props.slideId === slide
  })

  // Generate the buttons to change slides
  // These go in the bottom bar
  let buttons = children.map(child =>
    <Button
    key={child.props.slideId}
    title={child.props.name}
    style={styles.slideButton}
    onPress={() => setSlide(child.props.slideId)}/>
  )

  return (
    <View style={styles.container}>
      <ScrollView style={styles.contentContainer} contentContainerStyle={{flex: 1}}>
        {childDisplayed}
      </ScrollView>
      <View style={barStyle({barHeight})}>
        {buttons}
      </View>
    </View>
  )
}
