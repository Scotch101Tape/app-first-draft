import * as Linking from 'expo-linking';
import { Pressable, Text } from 'react-native';

export default function Link({children, url, style}) {
  return <Pressable style={style} onPress={() => Linking.openURL(url)}>
    {typeof(children) === "string" ? <Text style={{color: "blue"}}>{children}</Text> : children}
  </Pressable>
}
