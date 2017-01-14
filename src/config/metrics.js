/* @flow */
import { Dimensions, Platform } from 'react-native'

const IS_ANDROID = Platform.OS === 'android'
const { height, width } = Dimensions.get('window')

export default {
  ANDROID_STATUSBAR: 24,
  NAVBAR_HEIGHT: IS_ANDROID ? 54 : 64,
  DEVICE_HEIGHT: IS_ANDROID ? height - 24 : height,
  DEVICE_WIDTH: width,
  TILE_SIZE: width * 0.2,
  BOARD_MARGIN: 20
}
