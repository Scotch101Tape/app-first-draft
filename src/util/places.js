import { SECRET_APP_KEY, BACKEND_URL } from '../env';

export const CODES = {
  RESTAURANT: 1,
  GROCERY: 2,
  MOSQUE: 3,
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

  const result = await (await fetch(url, options)).json()
  return result
}
