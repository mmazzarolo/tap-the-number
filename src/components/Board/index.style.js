import { StyleSheet } from 'react-native'
import metrics from 'src/config/metrics'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    position: 'absolute',
    left: metrics.DEVICE_WIDTH * 0.3,
    height: metrics.DEVICE_HEIGHT * 0.7
  }
})
