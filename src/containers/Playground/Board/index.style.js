/* @flow */
import { StyleSheet } from 'react-native'
import metrics from 'src/config/metrics'

export default StyleSheet.create({
  container: {
    flex: 1,
    width: metrics.DEVICE_WIDTH - metrics.BOARD_MARGIN,
    height: metrics.DEVICE_HEIGHT - metrics.BOARD_MARGIN
  }
})
