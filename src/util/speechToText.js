import { testingFetcher } from './testing-fetching';

export async function getSpeechTranslation({recordingUri}) {
  // Adapted from https://stackoverflow.com/a/62208160
  const response = await fetch(recordingUri);
  const blob = await response.blob();

  // const url = `${BACKEND_URL}/get-speech-to`
  // const options = {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "X-SECRET-APP-KEY": SECRET_APP_KEY
  //   },
  //   body: JSON.stringify({
  //     target,
  //     text
  //   })
  // }

  // const result = await (await fetch(url, options)).json()

  return testingFetcher({
    text: "Hello",
    translation: "مرحبًا"
  })
}
