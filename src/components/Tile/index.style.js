/* @flow */
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
  },
  tile: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  depth: {
    position: 'absolute'
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Permanent Marker',
    fontSize: 39,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowRadius: 0,
    textShadowOffset: {
      height: 4,
      width: 4
    }
  }
})
