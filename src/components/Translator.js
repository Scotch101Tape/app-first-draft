import { useState } from 'react'
import { SafeAreaView } from 'react-native'
import {Text, TextInput, View, StyleSheet} from "react-native"
import { translate, getLanguage, LANGUAGE } from "../util/translate"

//function

// TODO: finish this, check ideas.dev

const styles = StyleSheet.create({
  container: {
    //flex: 1,
  },
  input: {
    width: "100%",
    height: 200,
    backgroundColor: "grey",
    fontSize: 30,
  },
  translation: {
    fontSize: 30,
  }
})

export default function Translator({}) {
  const [translation, setTranslation] = useState("")

  let currentTimeout = null
  function onChangeText(text) {
    if (currentTimeout !== null) {
      clearTimeout(currentTimeout)
    }

    currentTimeout = setTimeout(() => {
      currentTimeout = null

      const language = getLanguage({text})
      const target = language === LANGUAGE.ENGLISH ? LANGUAGE.ARABIC : LANGUAGE.ENGLISH

      translate({target, text})
        .then(({translation}) => setTranslation(translation))
        .catch(error => console.error(error))
    }, 1000)
  }

  return <SafeAreaView style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="Type to translate"
      onChangeText={onChangeText}
    />
    <Text style={styles.translation}>
      {translation}
    </Text>
  </SafeAreaView>
}
