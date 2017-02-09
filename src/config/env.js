/* @flow */
/* global __DEV__ */
import { Platform } from 'react-native';

export default {
  IS_ENV_DEVELOPMENT: __DEV__ || false,
  IS_ANDROID: Platform.OS === 'android',
  IS_MATERIAL_DESIGN_SUPPORTED: Platform.OS === 'android' && Platform.Version >= 21,
};
