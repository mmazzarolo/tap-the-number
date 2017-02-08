/* @flow */
import { StyleSheet } from 'react-native';
import colors from 'src/config/colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  content: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: 12,
    borderBottomColor: colors.TRANSPARENT_DARK,
    borderBottomWidth: 1,
  },
});
