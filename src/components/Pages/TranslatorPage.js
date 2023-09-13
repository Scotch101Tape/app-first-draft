import { StyleSheet, View, TextInput, Button, Text, ScrollView } from "react-native"
import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Navbar from '../Navbar';
import DemoBox from '../DemoBox';
import { translate, LANGUAGE } from '../../util/translate';
import { Audio } from "expo-av"
import { speechToText } from '../../util/speechToText';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    height: 100,
  },
  translationText: {
    color: "teal"
  }
})

/*
// Thank you to expo-av docs..
const startRecording = async () => {
  await Audio.requestPermissionsAsync()
  await Audio.setAudioModeAsync({
    allowsRecordingIOS: true,
    playsInSilentModeIOS: true,
  })

  const {recording} = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY)
  return recording
}

const stopRecording = async ({recording}) => {
  await recording.stopAndUnloadAsync()
  await Audio.setAudioModeAsync(
    {
      allowsRecordingIOS: false,
    }
  )

  const recordingUri = recording.getURI()
  return recordingUri
}
*/

export default function TranslatorPage({pageChangeStrategy, pageId}) {
  const [translation, setTranslation] = useState("")
  const [text, setText] = useState("")
  /*const [isRecording, setIsRecording] = useState(false)
  const recordingState = useRef({
    uri: null,
    recording: null,
    language: null,
    attemptingStart: false,
    attemptingStop: false,
  })*/

  /*
  function onPressStartRecording({language}) {
    if (!recordingState.current.attemptingStart) {
      recordingState.current.attemptingStart = true
      startRecording()
        .then(recording => {
          recordingState.current = {...recordingState.current, language, recording, attemptingStart: false}
          setIsRecording(true)
        })
        .catch(error => {
          console.error(error)
          recordingState.current.attemptingStart = false
        })
    }
  }

  function onPressStopRecordingAndTranslate() {
    if (!recordingState.current.attemptingStop) {
      recordingState.current.attemptingStop = true
      if (recordingState.current.recording !== null) {
        stopRecording({recording: recordingState.current.recording})
          .then(uri => {
            recordingState.current = {
              ...recordingState.current,
              recording: null,
              uri
            }
            return speechToText({recordingUri: uri})
          })
          .then(textFromRecording => {
            setText(textFromRecording)
            return translate({
              text: textFromRecording,
              target: recordingState.current.language === LANGUAGE.ARABIC ? LANGUAGE.ENGLISH : LANGUAGE.ARABIC
            })
          })
          .then(translation => {
            setTranslation(translation)
            setIsRecording(false)
            recordingState.current.attemptingStop = false
          })
          .catch(error => {
            console.error(error)
            recordingState.current.attemptingStop = false
          })
      } else {
        console.error("Trying to stop recording w/o recording to stop")
        recordingState.current.attemptingStop = false
      }
    }
  }
  */

  async function onPressTranslate ({text, target}) {
    const {translation} = await translate({target, text})
    setTranslation(translation)
  }

  /*
  useEffect(() => {
    let attemptedUnload = false
    return () => {
      if (!attemptedUnload) {
        attemptedUnload = true
        stopRecording({recording: recordingState.current.recording})
          .catch(() => {})
      }
    }
  }, [])
  */

  return <View style={styles.container}>
    <ScrollView>
      <DemoBox name="Source Text">
        <TextInput
          value={text}
          placeholder="You can type here"
          onChangeText={setText}
          style={styles.textInput}
        />
      </DemoBox>
      {/*<DemoBox name="Recording Buttons">
        {
          !isRecording
          ? (<View>
            <Button title="Record Arabic" onPress={() => onPressStartRecording({language: LANGUAGE.ARABIC})}/>
            <Button title="Record English" onPress={() => onPressStartRecording({language: LANGUAGE.ENGLISH})}/>
          </View>)
          : <Button title="Stop Recording and Translate" onPress={() => onPressStopRecordingAndTranslate()}/>
        }
      </DemoBox>*/}
      <DemoBox name="Translation Buttons">
        <Button title="Translate to Arabic" onPress={() => onPressTranslate({target: LANGUAGE.ARABIC, text})}/>
        <Button title="Translate to English" onPress={() => onPressTranslate({target: LANGUAGE.ENGLISH, text})}/>
      </DemoBox>
      <DemoBox name="Translation">
        <Text style={styles.translationText}>{translation}</Text>
      </DemoBox>
    </ScrollView>
    <Navbar pageChangeStrategy={pageChangeStrategy} pageId={pageId}/>
  </View>
}
