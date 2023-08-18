import { View, StyleSheet, Text } from "react-native"

// To be changed later, just styles
const styles = StyleSheet.create({
  failureText: {
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
    return <Text style={styles.failureText}>
      ⚠️ {failureMessage} ⚠️
    </Text>
  }
}
