import { SECRET_APP_KEY, BACKEND_URL } from '../env';

// Should be done on server, quick fix for development
const RATE_LIMITER = true

export const LANGUAGE = {
  ENGLISH: "en",
  ARABIC: "ar",
}

export function getLanguage({text}) {
  // This is a *very* naive language checker
  // As is, if the text has arabic then it is arabic
  // otherwise it is english

  // From https://stackoverflow.com/a/18591041
  // (License: CC BY-SA 3.0, https://stackoverflow.com/help/licensing)
  const pattern = /[\u0600-\u06FF\u0750-\u077F]/;
  const hasArabic = pattern.test(text)

  if (hasArabic) {
    return LANGUAGE.ARABIC
  } else {
    return LANGUAGE.ENGLISH
  }
}

// Translates the text into the target language
let rateLimiterFlag = false
export async function translate({text, target}) {
  if (RATE_LIMITER) {
    if (rateLimiterFlag) {
      return "Translation rate limited"
    } else {
      rateLimiterFlag = true
      setTimeout(() => rateLimiterFlag = false, 1000)
    }
  }

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

  const {translation} = await (await fetch(url, options)).json()
  console.log("Translation Fetched")
  console.log(translation)
  return translation
}
