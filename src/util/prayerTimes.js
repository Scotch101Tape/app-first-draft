import {
  Coordinates,
  CalculationMethod,
  PrayerTimes,
} from 'adhan';
import tz_lookup from 'tz-lookup';
import moment from 'moment-timezone';

const PRAYER_CALCULATION_METHOD = CalculationMethod.MuslimWorldLeague()

export const timeNames = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"]

export function getPrayerTimes({latitude, longitude}) {
  const timezone = tz_lookup(latitude, longitude)

  const coords = new Coordinates(latitude, longitude)

  // If I get the chance I could look at this again to make it more consise if possable (?)
  // Get the times from adhan library
  const {fajr, sunrise, dhuhr, asr, maghrib, isha} = new PrayerTimes(coords, new Date(), PRAYER_CALCULATION_METHOD)

  // Combine them and format them
  // This returns an object like {[name]: time}
  const prayerTimes = Object.fromEntries(new Array(fajr, sunrise, dhuhr, asr, maghrib, isha)
    .map(time => moment(time).tz(timezone).format("h:mm A"))
    .map((time, i) => [timeNames[i].toLowerCase(), time]))

  return prayerTimes
}
