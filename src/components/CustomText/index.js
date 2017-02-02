/* @flow */
import React, { Element } from 'react'
import { Text } from 'react-native-animatable'
import TouchableView from 'src/components/TouchableView'
import styles from './index.style'

type Props = {
  children?: string | Element<any>,
  onPress?: Function,
  style?: any,
}

const CustomText = (props: Props): Element<any> => {
  const { onPress, style, children, ...otherProps } = props
  const text = (
    <Text style={[styles.text, style]} {...otherProps}>
      {children}
    </Text>
  )
  return (onPress)
    ? <TouchableView onPress={onPress}>{text}</TouchableView>
    : text
}

export default CustomText
