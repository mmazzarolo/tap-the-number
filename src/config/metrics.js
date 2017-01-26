/* @flow */
import { Dimensions, Platform } from 'react-native'

const IS_ANDROID = Platform.OS === 'android'
const { height, width } = Dimensions.get('window')

const ANDROID_STATUSBAR = 24
const DEVICE_HEIGHT = IS_ANDROID ? height - ANDROID_STATUSBAR : height
const DEVICE_WIDTH = width

const TILE_SIZE = DEVICE_WIDTH * 0.22
const TILE_SHADOW_DEPTH = 6

const BOARD_MARGIN = 20
const BOARD_HEIGHT = DEVICE_HEIGHT * 0.80
const BOARD_WIDTH = DEVICE_WIDTH

export default {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  TILE_SIZE,
  TILE_SHADOW_DEPTH,
  BOARD_MARGIN,
  BOARD_HEIGHT,
  BOARD_WIDTH
}
