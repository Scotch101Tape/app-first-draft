import { StyleSheet, View, Button } from 'react-native';
import DemoBox from '../DemoBox';
import { PAGE_IDS } from '../../util/constants';
import Navbar from '../Navbar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default function ResourcesPage({data, setData}) {
  return <View style={styles.container}>
    <Navbar pageId={data.pageId} setPageId={pageId => setData({...data, pageId})}/>
  </View>
}
