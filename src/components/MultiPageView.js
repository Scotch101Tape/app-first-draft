import { StyleSheet, Text, View, Button, ScrollView } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default function MultiPageView({children, pageId}) {
  const pageDisplayed = children.find(page => page.props.pageId === pageId)

  return pageDisplayed
}
