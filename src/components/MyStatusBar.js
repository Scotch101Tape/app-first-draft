import { memo } from 'react'
import {StatusBar, View, StyleSheet, SafeAreaView, Platform} from "react-native"
import { Nothing, Rect } from './layout'

function MyStatusBar({backgroundColor}) {
  return <View style={{backgroundColor}}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} />
    </SafeAreaView>
    {Platform.OS === "android" ? <Rect height={StatusBar.currentHeight}/> : <Nothing/>}
  </View>
}

export default memo(MyStatusBar)
