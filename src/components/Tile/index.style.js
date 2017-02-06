/* @flow */
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  tile: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  depth: {
    zIndex: 1,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Permanent Marker',
    fontSize: 39,
    padding: 4, // Fixes cutted off text
  },
});
