import {
  Coordinates,
  CalculationMethod,
  PrayerTimes,
} from 'adhan';
import tz_lookup from 'tz-lookup';
import moment from 'moment-timezone';

const PRAYER_CALCULATION_METHOD = CalculationMethod.MuslimWorldLeague()

export const timeNames = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"]

export function getPrayerTimes({latitude, longitude, date}) {
  const timezone = tz_lookup(latitude, longitude)

  const coords = new Coordinates(latitude, longitude)

  // If I get the chance I could look at this again to make it more concise if possible (?)
  // Get the times from adhan library
  const {fajr, sunrise, dhuhr, asr, maghrib, isha} = new PrayerTimes(coords, date, PRAYER_CALCULATION_METHOD)

  // Combine them and format them
  // This returns an object like {[name]: time}
  const prayerTimes = Object.fromEntries(new Array(fajr, sunrise, dhuhr, asr, maghrib, isha)
    .map(time => moment(time).tz(timezone))
    .map((time, i) => [timeNames[i].toLowerCase(), time]))

  return prayerTimes
}

export function getNextPrayerTime({latitude, longitude}) {
  const timezone = tz_lookup(latitude, longitude)
  const coords = new Coordinates(latitude, longitude)
  const now = new Date()
  const tomorrow = new Date(now.getTime() + 1000 * 60 * 60 * 24)
  const {fajr: a, dhuhr: l, asr: g, maghrib: o, isha: r} = new PrayerTimes(coords, now, PRAYER_CALCULATION_METHOD)
  const {fajr: i, dhuhr: t, asr: h, maghrib: m, isha: s} = new PrayerTimes(coords, tomorrow, PRAYER_CALCULATION_METHOD)
  const times = [a, l, g, o, r, i, t, h, m, s]
  const nextPrayerTime = times.find(time => time > now)
  return moment(nextPrayerTime).tz(timezone).format("h:mm A")
}
