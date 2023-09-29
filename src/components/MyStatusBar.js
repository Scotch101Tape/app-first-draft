import { memo } from 'react'
import {StatusBar, View, StyleSheet, SafeAreaView, Platform} from "react-native"

const styles = StyleSheet.create({
  statusbar: {}
})

// Adapted from https://stackoverflow.com/a/39300715
// LICENSE: CC BY-SA 4.0
function MyStatusBar ({backgroundColor, ...props}) {
  return <View style={[styles.statusBar, { backgroundColor }]}>
    {Platform.OS === "ios" ? <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView> : <View/>}
  </View>
}

export default memo(MyStatusBar)
