import { SECRET_APP_KEY, BACKEND_URL } from '../env';

export const LANGUAGE = {
  ENGLISH: "en",
  ARABIC: "ar",
}

export function getLanguage({text}) {
  // This is a *very* naive language checker
  // As is, if the text has arabic then it is arabic
  // otherwise it is english

  // Thank you to https://stackoverflow.com/a/18591041 for this code snippet
  // Check if any arabic characters are in the string
  const pattern = /[\u0600-\u06FF\u0750-\u077F]/;
  const hasArabic = pattern.test(text)

  if (hasArabic) {
    return LANGUAGE.ARABIC
  } else {
    return LANGUAGE.ENGLISH
  }
}

// Translates the text into the target language
export async function translate({text, target}) {
  const url = `${BACKEND_URL}/get-translation`
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-SECRET-APP-KEY": SECRET_APP_KEY
    },
    body: JSON.stringify({
      target,
      text
    })
  }

  const resData = await (await fetch(url, options)).json()
  console.log(resData)
  return resData
}
