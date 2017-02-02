/* @flow */
import { StyleSheet } from 'react-native'
import metrics from 'src/config/metrics'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tile: {
    marginRight: metrics.DEVICE_WIDTH * 0.05
  },
  tileText: {
    fontSize: 32
  },
  logo: {
    flex: 1,
    height: null,
    width: metrics.DEVICE_WIDTH * 0.50
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
  },
  buttonText: {
    color: 'white'
  }
})
