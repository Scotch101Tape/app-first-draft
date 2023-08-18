import { View, StyleSheet, Text } from "react-native"

const styles = StyleSheet.create({
  container: {
    margin: 30,
    flex: 1,
    alignItems: "center",
    borderColor: "black",
    borderStyle: "dotted",
    borderWidth: 3,
    //flexBasis: "auto",
    flexGrow: 1,
    //flexShrink: 1,
    //position: "relative",
    padding: 10,
  },
  nameText: {
    position: "absolute",
    top: -20,
    left: -3,
    color: "red"
  }
})

export default function DemoBox({name, children}) {
  return <View style={styles.container}>
    <Text style={styles.nameText}>{name}</Text>
    {children}
  </View>
}
