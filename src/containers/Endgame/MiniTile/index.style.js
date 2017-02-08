/* @flow */
import { StyleSheet } from 'react-native';
import metrics from 'src/config/metrics';
import colors from 'src/config/colors';

const MINI_TILE_SIZE = metrics.DEVICE_WIDTH * 0.1;

export default StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: colors.TRANSPARENT_DARK,
    width: metrics.DEVICE_WIDTH / 10,
    height: metrics.DEVICE_WIDTH / 10,
    marginLeft: -(metrics.DEVICE_WIDTH / 30),
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  text: {
    fontSize: 12,
    color: 'white',
  },
});
