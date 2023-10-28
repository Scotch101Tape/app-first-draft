import { Audio } from 'expo-av';
import { Container, Bold, Rect, C, R, Nothing, Loading } from "../layout";
import { View, TextInput, Text, Image, ScrollView, Pressable, Keyboard} from "react-native"
import { useState, useEffect, useLayoutEffect, useRef, createRef } from 'react';
import Navbar from '../Navbar';
import { translate, LANGUAGE, oppositeLanguage, getLanguage } from '../../util/translate';
import { getSpeechTranslation, speechToText } from '../../util/speechToText';
import MyStatusBar from '../MyStatusBar';

// Adapted from https://docs.expo.dev/versions/latest/sdk/audio/
export default function TranslatorPage({data, setData}) {
  const [recording, setRecording] = useState();
  const [text, setText] = useState("")
  const [translation, setTranslation] = useState("")
  const [textLoading, setTextLoading] = useState(false)
  const [translationLoading, setTranslationLoading] = useState(false)
  const textBoxRef = useRef()

  // async function startRecording() {
  //   try {
  //     await Audio.requestPermissionsAsync();
  //     await Audio.setAudioModeAsync({
  //       allowsRecordingIOS: true,
  //       playsInSilentModeIOS: true,
  //     });

  //     const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
  //     );
  //     setRecording(recording);
  //   } catch (err) {
  //     console.warn('Failed to start recording', err);
  //   }
  // }

  // async function stopRecording() {
  //   setRecording(undefined);
  //   await recording.stopAndUnloadAsync();
  //   await Audio.setAudioModeAsync(
  //     {
  //       allowsRecordingIOS: false,
  //     }
  //   );
  //   const uri = recording.getURI();

  //   setTranslation("")
  //   setTranslationLoading(true)
  //   setText("")
  //   setTextLoading(true)

  //   getSpeechTranslation({recordingUri: uri})
  //   .then(({text: newText, translation: newTranslation}) => {
  //     setTranslation(newTranslation)
  //     setTranslationLoading(false)
  //     setText(newText)
  //     setTextLoading(false)
  //   })
  //   .catch((error) => {
  //     setTranslationLoading(false)
  //     setTextLoading(false)
  //     console.warn("Speech translation failed")
  //     console.warn(error)
  //   })
  // }

  const translationButtonPress = () => {
    textBoxRef.current?.blur()
    setTranslation("")
    setTranslationLoading(true)
    translate({text, target: oppositeLanguage(getLanguage(text))})
    .then((newTranslation) => {
      setTranslationLoading(false)
      setTranslation(newTranslation)
    })
    .catch(() => {
      setTranslationLoading(false)
      console.warn("Translation failed")
    })
  }

  // const speechButtonPress = () => {
  //   textBoxRef.current?.blur()
  //   if (recording) {
  //     stopRecording()
  //   } else {
  //     startRecording()
  //   }
  // }

  return <Container style={{backgroundColor: "#DCDADB"}}>
    <Pressable style={{flex: 1}} onPress={Keyboard.dismiss}>
      <MyStatusBar/>
      <Rect height={15}/>
      <Bold style={{fontSize: 30, paddingLeft: 10}}>Translator تطبيق مترجم</Bold>
      <Rect width={340} height={3} color={"black"}/>
      <Rect height={10}/>
      <C>
        <C style={{backgroundColor: "white", marginHorizontal: 10, borderRadius: 10, padding: 5, paddingBottom: 39}}>
          {
            text
            ?
              <Nothing/>
            :
              <View style={{position: "absolute", width: "100%", height: "100%", left: 5, top: 2.5}}>
                <C style={{justifyContent: "center", alignItems: "center"}}>
                  {textLoading
                  ?
                    <Loading/>
                  :
                    <Bold style={{fontSize: 20, color: "grey", paddingTop: 30}}>
                      Text معلومات
                    </Bold>
                  }
                </C>
              </View>
          }
          <Pressable onPress={() => textBoxRef.current ? textBoxRef.current.focus(): {}} style={{width: "100%", height: "100%"}}>
            <TextInput
              ref={textBoxRef}
              editable={!textLoading}
              multiline
              maxLength={500}
              onChangeText={setText}
              value={text}
              style={{margin: 5, fontSize: 20}}
            />
          </Pressable>
        </C>
        <View style={{height: 50, zIndex: 1}}>
          <R style={{justifyContent: "space-evenly", alignItems: "center"}}>
            {/* <Pressable onPress={speechButtonPress}>
              <Image style={{width: 128, height: 128}} source={recording ? require("../../../assets/page-specific/translator/RecordingButton.png") : require("../../../assets/page-specific/translator/SpeechButton.png")}/>
            </Pressable> */}
            <Pressable onPress={translationButtonPress}>
              <Image style={{width: 128, height: 128}} source={require("../../../assets/page-specific/translator/TranslateButton.png")}/>
            </Pressable>
          </R>
        </View>
        <C style={{backgroundColor: "white", marginHorizontal: 10, borderRadius: 10}}>
          <Rect height={39}/>
          {translation
          ?
            <ScrollView style={{paddingHorizontal: 5, marginHorizontal: 5, marginVertical: 10}}>
              <Text style={{fontSize: 20}} selectable={true}>
                {translation}
              </Text>
              <Rect height={20}/>
            </ScrollView>
          :
            <C style={{justifyContent: "center", alignItems: "center"}}>
              {translationLoading
              ?
                <Loading/>
              :
                <Bold style={{fontSize: 20, color: "grey", paddingBottom: 39}}>
                  Translation ترجمة
                </Bold>
              }
            </C>
          }
        </C>
      </C>
      <Rect height={65}/>

      <Navbar pageId={data.pageId} setPageId={pageId => setData({...data, pageId})}/>
    </Pressable>
  </Container>
}
