// TODO: this isn't useful anymore, figure out what to do with it

import { View, StyleSheet, Text } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    /*margin: 30,
    flex: 1,
    alignItems: "center",
    borderColor: "black",
    borderStyle: "dotted",
    borderWidth: 3,
    //flexBasis: "auto",
    flexGrow: 1,
    //flexShrink: 1,
    //position: "relative",
    padding: 10,*/
  },
  borderedContainer: {
    flex: 1,
    borderColor: "black",
    borderStyle: "dotted",
    borderWidth: 3,
    flexGrow: 1,
    padding: 3,
    //alignItems: "center"
  },
  nameText: {
    /*position: "absolute",
    top: -20,
    left: -3,
    color: "red"*/
    color: "red"
  }
})

export default function DemoBox({name, children}) {
  return <View style={styles.container}>
    <Text style={styles.nameText}>{name}</Text>
    <View style={styles.borderedContainer}>
      {children}
    </View>
  </View>
}
