import { ScrollView, Pressable, Text } from "react-native"
import { R, C, centerStyle } from "./layout"
import { CODES } from '../util/places'

function FindButton({code, text, selected, onPress}) {
  return <Pressable style={{marginRight: 10}} onPress={() => onPress(code)}>
    <C style={[centerStyle, {padding: 5, borderRadius: 25 /* equal to this padding plus the inside's border radius*/, borderColor: code === selected ? "white" : (0, 0, 0, 0), borderWidth: 3}]}>
      <C style={{justifyContent: "center", alignItems: "center", borderRadius: 20, backgroundColor: "white", padding: 10}}>
        <Text style={{fontWeight: "bold", fontSize: 20}}>{text}</Text>
      </C>
    </C>
  </Pressable>
}

export default function PlaceCodePicker({selected, onPress}) {
  return <ScrollView style={{padding: 10}} horizontal={true} showsHorizontalScrollIndicator={false}>
    <R style={{justifyContent: "space-around", alignItems: "center"}}>
      <FindButton text={"Halal Grocery بقالة حلال"} code={CODES.GROCERY} selected={selected} onPress={onPress}/>
      <FindButton text={"Clothing ملابس"} code={CODES.CLOTHING} selected={selected} onPress={onPress}/>
      <FindButton text={"Mosques مسجد"} code={CODES.MOSQUE} selected={selected} onPress={onPress}/>
    </R>
  </ScrollView>
}
