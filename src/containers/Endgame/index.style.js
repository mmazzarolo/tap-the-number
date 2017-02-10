/* @flow */
import { StyleSheet } from 'react-native';
import metrics from 'src/config/metrics';

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
  },
  header: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 52,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
  },
  scoreText: {
    fontSize: 66,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
  },
  body: {
    flex: 2,
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
