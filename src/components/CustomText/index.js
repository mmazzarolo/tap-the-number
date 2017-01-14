import React, { PropTypes } from 'react'
import { Text } from 'react-native'

import styles from './index.style'

const CustomText = ({ style, children, ...otherProps }) =>
  <Text style={[styles.text, style]} {...otherProps}>
    {children}
  </Text>

CustomText.propTypes = {
  style: PropTypes.any,
  children: PropTypes.node
}

export default CustomText
