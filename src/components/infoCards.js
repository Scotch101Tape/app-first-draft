import { useState } from 'react'
import { View, Text } from "react-native"

export function MiniInfoCard({dump, style}) {
  if (!style || !style.width || ! style.height) {
    console.warn("MiniInfoCard must have specified width and height in style")
  }
  return <View style={{width: style.width, height: style.height, marginBottom: 20, marginLeft:10, marginRight: 10, overflow: "hidden", backgroundColor: "white"}}>
   <Text>{JSON.stringify(dump)}</Text>
  </View>
}

export function InfoCard({dump, miniHeight, expandedHeight, startMini}) {
  const [isMini, setIsMini] = useState(startMini)


}
