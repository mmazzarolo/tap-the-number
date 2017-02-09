/* @flow */
import { StyleSheet } from 'react-native';
import colors from 'src/config/colors';
import metrics from 'src/config/metrics';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  content: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: metrics.TIME_BAR_HEIGHT,
    borderColor: colors.TRANSPARENT_DARK,
    borderWidth: 1,
  },
});
