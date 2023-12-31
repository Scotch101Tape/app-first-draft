import { View, Image, Text, ActivityIndicator } from 'react-native'

export function C({grow, style, children}) {
  return <View style={[{flex: 1, flexDirection: "column", flexGrow: grow || 1}, style]}>{children}</View>
}

export function R({grow, style, children}) {
  return <View style={[{flex: 1, flexDirection: "row", flexGrow: grow || 1}, style]}>{children}</View>
}

export function Container({children, style}) {
  return <View style={[{flex: 1}, style]}>{children}</View>
}

export function Background({source, style}) {
  return <Image source={source} style={[{position: "absolute", height: "100%", width: "100%", left: 0, right: 0, resizeMode: "stretch"}, style]}/>
}

export function Bold({style, children}) {
  return <Text style={{...style, fontWeight: "bold"}}>{children}</Text>
}

export const centerStyle = {alginItems: "center", justifyContent: "center"}

export function Circle({style, color, radius}) {
  return <View style={[style, {backgroundColor: color, borderRadius: radius, width: radius * 2, height: radius * 2}]}/>
}

export function Rect({style, color, width, height}) {
  return <View style={[style, {backgroundColor: color, width, height}]}/>
}

export function Nothing() {
  return <View/>
}

export function randomKey() {
  return Math.random() * 1e10
}

export function Loading({color, size}) {
  return <C style={{justifyContent: "center", alignItems: "center"}}>
    <ActivityIndicator color={color} size={size ? size : "large"}/>
  </C>
}
