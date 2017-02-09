/* @flow */
import { StyleSheet } from 'react-native';
import metrics from 'src/config/metrics';

const tileSize = metrics.DEVICE_WIDTH * 0.26;
const logoWidth = metrics.DEVICE_WIDTH * 0.50;

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tile: {
    width: tileSize,
    height: tileSize,
  },
  tileText: {
    fontSize: 40,
  },
  logo: {
    flex: 1,
    marginLeft: metrics.DEVICE_WIDTH * 0.05,
    height: null,
    width: logoWidth,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  buttonText: {
    fontSize: 36,
  },
});
