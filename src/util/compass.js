// From https://github.com/rahulhaque/compass-react-native-expo/blob/master/App.js
// (License: MIT, https://github.com/rahulhaque/compass-react-native-expo/blob/master/LICENSE)
export const getReading = (magnetometerData) => {
  let angle = 0
  if (magnetometerData) {
    let {x, y} = magnetometerData
    if (Math.atan2(y, x) >= 0) {
      angle = Math.atan2(y, x) * (180 / Math.PI)
    } else {
      angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI)
    }
  }
  return Math.round(angle)
}

export const getRotate = ({reading, pointsTo}) => {
  return (360 + pointsTo - reading)
}

export const getRotateRadians = ({reading, pointsTo}) => {
  return getRotate({reading, pointsTo}) / 180 * Math.PI
}
