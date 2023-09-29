import { View, Image } from 'react-native'

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

export const centerStyle = {alginItems: "center", justifyContent: "center"}
