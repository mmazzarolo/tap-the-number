import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  containerDefault: {
    position: 'absolute',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: 'rgba(0, 0, 0, 0.2)'
    // shadowOpacity: 1,
    // shadowRadius: 0,
    // shadowOffset: {
    //   height: 4,
    //   width: 4
    // }
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageDefault: {
    flex: 1,
    resizeMode: 'contain',
    tintColor: 'rgba(0, 0, 0, 0.7)'
  },
  overlayDefault: { // ???
    position: 'absolute',
    backgroundColor: 'black'
  }
})
