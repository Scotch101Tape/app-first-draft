import { StyleSheet, View, Button } from 'react-native';
import DemoBox from '../DemoBox';
import { PAGE_IDS } from '../../util/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default function ResourcesPage({pageChangeStrategy}) {
  return <View style={styles.container}>
    <DemoBox>
      <Button title="Back Button" onPress={() => pageChangeStrategy(PAGE_IDS.HOME)}/>
    </DemoBox>
  </View>
}
