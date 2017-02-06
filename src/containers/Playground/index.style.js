/* @flow */
import { StyleSheet } from 'react-native';
import metrics from 'src/config/metrics';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    position: 'absolute',
    width: metrics.DEVICE_WIDTH,
    height: metrics.DEVICE_HEIGHT,
  },
  overlay: {
    position: 'absolute',
    width: metrics.DEVICE_WIDTH,
    height: metrics.DEVICE_HEIGHT,
    backgroundColor: 'black',
    opacity: 0.2,
  },
});
