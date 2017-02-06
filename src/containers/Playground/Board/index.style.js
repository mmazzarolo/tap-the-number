/* @flow */
import { StyleSheet } from 'react-native';
import metrics from 'src/config/metrics';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    width: metrics.BOARD_WIDTH,
    height: metrics.BOARD_HEIGHT,
    left: 0,
    bottom: 0,
  },
});
