import {StatusBar, View, StyleSheet, SafeAreaView} from "react-native"

const styles = StyleSheet.create({
  statusbar: {}
})

// From https://stackoverflow.com/a/39300715
// LICENSE: CC BY-SA 4.0
export default function MyStatusBar ({backgroundColor, ...props}) {
  return <View style={[styles.statusBar, { backgroundColor }]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
}
