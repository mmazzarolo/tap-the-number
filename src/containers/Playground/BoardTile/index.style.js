/* @flow */
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  containerDefault: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowOpacity: 1,
    shadowRadius: 0,
    justifyContent: 'center',
    alignItems: 'center'
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
  },
  explosionDefault: {
    position: 'absolute'
  }
})
