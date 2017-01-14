import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    // margin: 20,
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FAA855'
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  footerLeft: {
    flex: 1,
    alignItems: 'flex-start'
  },
  footerRight: {
    flex: 1,
    alignItems: 'flex-end'
  },
  tile: {
    position: 'relative'
  }
})
