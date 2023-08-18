import geomagnetism from "geomagnetism"

const MECCA_COORDS = {
  latitude: 21.45,
  longitude: -39.75,
}

// Function based on https://ftp.unpad.ac.id/orari/library/library-islam/knowledge/qibla_calc.html
export function getQibla({latitude, longitude}) {
  const trueNorthOffset = Math.atan(
    Math.sin(longitude - MECCA_COORDS.longitude)
    /
    ((Math.cos(latitude) * Math.tan(MECCA_COORDS.latitude)) - (Math.sin(latitude) * Math.cos(longitude - MECCA_COORDS.longitude)))
  ) / Math.PI * 180
  const magDecl = geomagnetism.model().point([latitude, longitude]).decl

  // Pretty sure this is the right way to do things
  // I did some math
  return trueNorthOffset - magDecl
}
