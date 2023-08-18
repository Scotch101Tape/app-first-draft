import { StyleSheet, View } from 'react-native';
import Navbar from '../Navbar'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default function CompassPage({pageChangeStrategy, pageId}) {
  return <View style={styles.container}>
    <Navbar pageChangeStrategy={pageChangeStrategy} pageId={pageId}/>
  </View>
}
