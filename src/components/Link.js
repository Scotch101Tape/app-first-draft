import * as Linking from 'expo-linking';
import { Pressable, Text } from 'react-native';

export default function Link({text, url, style, textStyle}) {
  return <Pressable style={style} onPress={() => Linking.openURL(url)}>
    <Text style={{color: "blue", ...textStyle}}>{text}</Text>
  </Pressable>
}
