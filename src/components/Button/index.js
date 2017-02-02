/* @flow */
import React, { Element } from 'react'
import CustomText from 'src/components/CustomText'
import TouchableView from 'src/components/TouchableView'
import styles from './index.style'

type Props = {
  text: string,
  style?: any,
  textStyle?: any,
  onPress: Function
}

const Button = (props: Props): Element<any> => {
  const { text, style, textStyle, onPress, ...otherProps } = props
  return (
    <TouchableView
      onPress={onPress}
      style={[styles.container, style]}
      {...otherProps}
    >
      <CustomText style={[styles.text, textStyle]}>
        {text}
      </CustomText>
    </TouchableView>
  )
}

export default Button
