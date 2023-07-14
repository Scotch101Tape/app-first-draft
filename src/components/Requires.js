import { View, StyleSheet, Text } from "react-native"

// To be changed later, just styles
const styles = StyleSheet.create({
  failureContainer: {
    width: "100%",
    height: "100%",
    margin: 5,
    marginTop: 20,
  },
  failureText: {
    fontSize: 40,
  }
})

export default function Requires({requisites, children, failureMessage}) {
  // get requisites that are undefined
  const failedRequisties = requisites.filter(requisite => requisite === undefined || requisite === null)

  if (failedRequisties.length === 0) {
    // change nothing when no requisites failed
    return children
  } else {
    // return an error message when failed
    return <View style={styles.failureContainer}>
      <Text style={styles.failureText}>
        {failureMessage}
      </Text>
    </View>
  }
}
