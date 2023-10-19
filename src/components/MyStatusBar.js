import { memo } from 'react'
import {StatusBar, View, StyleSheet, SafeAreaView, Platform, Appearance} from "react-native"
import { Nothing, Rect } from './layout'

function MyStatusBar() {
  return <View style={{backgroundColor: "black"}}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={"black"} />
    </SafeAreaView>
    {Platform.OS === "android" ? <Rect height={StatusBar.currentHeight}/> : <Nothing/>}
  </View>
}

export default memo(MyStatusBar)
