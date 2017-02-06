/* @flow */
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  text: {
    // color: 'rgba(255, 255, 255, 0.9)',
    color: '#1840CE',
    fontWeight: 'bold',
    fontFamily: 'Permanent Marker',
    fontSize: 36,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    textShadowRadius: 0,
    textShadowOffset: {
      height: 4,
      width: 4,
    },
  },
});
