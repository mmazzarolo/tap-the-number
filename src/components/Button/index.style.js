/* @flow */
import { StyleSheet } from 'react-native'
import colors from 'src/config/colors'

export default StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.TRANSPARENT_DARK,
    paddingHorizontal: 52,
    paddingVertical: 18,
    borderRadius: 4
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold'
  }
})
