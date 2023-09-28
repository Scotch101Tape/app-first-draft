import { View } from 'react-native'

export function C({grow, style, children}) {
  return <View style={{...style, flex: 1, flexDirection: "column", flexGrow: grow || 1}}>{children}</View>
}

export function R({grow, style, children}) {
  return <View style={{...style, flex: 1, flexDirection: "row", flexGrow: grow || 1}}>{children}</View>
}

export function Block({color}) {
  return <View style={{backgroundColor: color}}></View>
}

export function Container({children, style}) {
  return <View style={{...style, flex: 1}}>{children}</View>
}
