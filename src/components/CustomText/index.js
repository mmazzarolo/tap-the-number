/* @flow */
import React, { Element } from 'react'
import { Text } from 'react-native'

import styles from './index.style'

type Props = {
  style?: any,
  children?: Element<any>,
}

const CustomText = (props: Props): Element<any> => {
  const { style, children, ...otherProps } = props
  return (
    <Text style={[styles.text, style]} {...otherProps}>
      {children}
    </Text>
  )
}

export default CustomText
