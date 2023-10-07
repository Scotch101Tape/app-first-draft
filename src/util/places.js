import { SECRET_APP_KEY, BACKEND_URL } from '../env';

export const CODES = {
  RESTAURANT: 1, // Unused atm
  GROCERY: 2,
  MOSQUE: 3,
  CLOTHING: 4,
}

export async function findPlacesTest({code, location}) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (Math.random() < 0.1) {
        res({
          code,
          location,
          other: "you did it"
        })
      } else {
        rej("NO WAY")
      }
    }, 1000)
  })
}

export async function findPlaces({code, location}) {
  const url = `${BACKEND_URL}/find-places`
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-SECRET-APP-KEY": SECRET_APP_KEY
    },
    body: JSON.stringify({
      code,
      location
    })
  }

  const fetch_result = await fetch(url, options)
  const result = await fetch_result.json()
  return result
}

export async function placeDetails({placeId}) {
  const url = `${BACKEND_URL}/place-details`
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-SECRET-APP-KEY": SECRET_APP_KEY
    },
    body: JSON.stringify({
      placeId
    })
  }

  const fetch_result = await fetch(url, options)
  const result = await fetch_result.json()
  return result
}
