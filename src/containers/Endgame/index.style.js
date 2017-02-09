/* @flow */
import { StyleSheet } from 'react-native';
import metrics from 'src/config/metrics';
import colors from 'src/config/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0,0.5)',
  },
  content: {
    width: metrics.DEVICE_WIDTH,
    height: metrics.DEVICE_HEIGHT,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 42,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
  },
  scoreText: {
    fontSize: 54,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
  },
  button: {
    marginTop: 60,
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  buttonText: {
    fontSize: 26,
    paddingHorizontal: 4,
  },
});
