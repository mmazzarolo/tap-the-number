/* @flow */
import { StyleSheet } from 'react-native'
import metrics from 'src/config/metrics'

export default StyleSheet.create({
  containerDefault: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowOffset: {
      height: 4,
      width: 4
    },
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20
  },
  explosionDefault: {
    position: 'absolute'
  }
})
