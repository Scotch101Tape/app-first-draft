// import { StyleSheet, View, TextInput, Button, Text, ScrollView } from "react-native"
// import { useState, useEffect, useLayoutEffect, useRef } from 'react';
// import Navbar from '../Navbar';
// import DemoBox from '../DemoBox';
// import { translate, LANGUAGE } from '../../util/translate';
// import { Audio } from "expo-av"
// import { speechToText } from '../../util/speechToText';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   textInput: {
//     height: 100,
//   },
//   translationText: {
//     color: "teal"
//   }
// })

// /*
// // Thank you to expo-av docs..
// const startRecording = async () => {
//   await Audio.requestPermissionsAsync()
//   await Audio.setAudioModeAsync({
//     allowsRecordingIOS: true,
//     playsInSilentModeIOS: true,
//   })

//   const {recording} = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY)
//   return recording
// }

// const stopRecording = async ({recording}) => {
//   await recording.stopAndUnloadAsync()
//   await Audio.setAudioModeAsync(
//     {
//       allowsRecordingIOS: false,
//     }
//   )

//   const recordingUri = recording.getURI()
//   return recordingUri
// }
// */

// export default function TranslatorPage({data, setData}) {
//   const [translation, setTranslation] = useState("")
//   const [text, setText] = useState("")
//   /*const [isRecording, setIsRecording] = useState(false)
//   const recordingState = useRef({
//     uri: null,
//     recording: null,
//     language: null,
//     attemptingStart: false,
//     attemptingStop: false,
//   })*/

//   /*
//   function onPressStartRecording({language}) {
//     if (!recordingState.current.attemptingStart) {
//       recordingState.current.attemptingStart = true
//       startRecording()
//         .then(recording => {
//           recordingState.current = {...recordingState.current, language, recording, attemptingStart: false}
//           setIsRecording(true)
//         })
//         .catch(error => {
//           console.error(error)
//           recordingState.current.attemptingStart = false
//         })
//     }
//   }

//   function onPressStopRecordingAndTranslate() {
//     if (!recordingState.current.attemptingStop) {
//       recordingState.current.attemptingStop = true
//       if (recordingState.current.recording !== null) {
//         stopRecording({recording: recordingState.current.recording})
//           .then(uri => {
//             recordingState.current = {
//               ...recordingState.current,
//               recording: null,
//               uri
//             }
//             return speechToText({recordingUri: uri})
//           })
//           .then(textFromRecording => {
//             setText(textFromRecording)
//             return translate({
//               text: textFromRecording,
//               target: recordingState.current.language === LANGUAGE.ARABIC ? LANGUAGE.ENGLISH : LANGUAGE.ARABIC
//             })
//           })
//           .then(translation => {
//             setTranslation(translation)
//             setIsRecording(false)
//             recordingState.current.attemptingStop = false
//           })
//           .catch(error => {
//             console.error(error)
//             recordingState.current.attemptingStop = false
//           })
//       } else {
//         console.error("Trying to stop recording w/o recording to stop")
//         recordingState.current.attemptingStop = false
//       }
//     }
//   }
//   */

//   async function onPressTranslate ({text, target}) {
//     const translation = await translate({target, text})
//     setTranslation(translation)
//   }

//   /*
//   useEffect(() => {
//     let attemptedUnload = false
//     return () => {
//       if (!attemptedUnload) {
//         attemptedUnload = true
//         stopRecording({recording: recordingState.current.recording})
//           .catch(() => {})
//       }
//     }
//   }, [])
//   */

//   return <View style={styles.container}>
//     <ScrollView>
//       <DemoBox name="Source Text">
//         <TextInput
//           value={text}
//           placeholder="You can type here"
//           onChangeText={setText}
//           style={styles.textInput}
//         />
//       </DemoBox>
//       {/*<DemoBox name="Recording Buttons">
//         {
//           !isRecording
//           ? (<View>
//             <Button title="Record Arabic" onPress={() => onPressStartRecording({language: LANGUAGE.ARABIC})}/>
//             <Button title="Record English" onPress={() => onPressStartRecording({language: LANGUAGE.ENGLISH})}/>
//           </View>)
//           : <Button title="Stop Recording and Translate" onPress={() => onPressStopRecordingAndTranslate()}/>
//         }
//       </DemoBox>*/}
//       <DemoBox name="Translation Buttons">
//         <Button title="Translate to Arabic" onPress={() => onPressTranslate({target: LANGUAGE.ARABIC, text})}/>
//         <Button title="Translate to English" onPress={() => onPressTranslate({target: LANGUAGE.ENGLISH, text})}/>
//       </DemoBox>
//       <DemoBox name="Translation">
//         <Text style={styles.translationText}>{translation}</Text>
//       </DemoBox>
//     </ScrollView>
//     <Navbar setPageId={pageId => setData({...data, pageId})} pageId={data.pageId}/>
//   </View>
// }


import { Audio } from 'expo-av';
import { Container, Bold, Rect, C, R, Nothing, Loading } from "../layout";
import { View, TextInput, Text, Image, ScrollView, Pressable, Keyboard} from "react-native"
import { useState, useEffect, useLayoutEffect, useRef, createRef } from 'react';
import Navbar from '../Navbar';
import DemoBox from '../DemoBox';
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

  async function startRecording() {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.warn('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync(
      {
        allowsRecordingIOS: false,
      }
    );
    const uri = recording.getURI();

    setTranslation("")
    setTranslationLoading(true)
    setText("")
    setTextLoading(true)

    getSpeechTranslation({recordingUri: uri})
    .then(({text: newText, translation: newTranslation}) => {
      setTranslation(newTranslation)
      setTranslationLoading(false)
      setText(newText)
      setTextLoading(false)
    })
    .catch((error) => {
      setTranslationLoading(false)
      setTextLoading(false)
      console.warn("Speech translation failed")
    })
  }

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

  const speechButtonPress = () => {
    textBoxRef.current?.blur()
    if (recording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

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
            <Pressable onPress={speechButtonPress}>
              <Image style={{width: 128, height: 128}} source={recording ? require("../../../assets/page-specific/translator/RecordingButton.png") : require("../../../assets/page-specific/translator/SpeechButton.png")}/>
            </Pressable>
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
