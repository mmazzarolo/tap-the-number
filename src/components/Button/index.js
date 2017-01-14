/* @flow */
import React, { Element } from 'react'
import { ActivityIndicator } from 'react-native'
import { noop } from 'lodash'

import TouchableView from 'src/components/TouchableView'
import CustomText from 'src/components/CustomText'
import colors from 'src/config/colors'

import styles from './index.style'

type Props = {
  onPress: Function,
  isEnabled?: boolean,
  isLoading?: boolean,
  children?: any,
  text?: string,
  icon?: string,
  style?: any,
  textStyle?: any
}

const Button = (props: Props): Element<any> => {
  const {
    onPress,
    isEnabled = true,
    isLoading = false,
    children,
    text,
    icon,
    style,
    textStyle
  } = props

  const backgroundColor = isEnabled && !isLoading ? colors.PRIMARY : colors.GREY_LIGHTEST
  const color = isEnabled && !isLoading ? 'white' : colors.GREY
  const onButtonPress = isEnabled && !isLoading ? onPress : noop

  return (
    <TouchableView onPress={onButtonPress} style={[styles.button, { backgroundColor }, style]}>
      {(isLoading) && <ActivityIndicator style={styles.spinner} color={colors.GREY} />}
      {(!isLoading && children) && children}
      {(!isLoading && !children) && (
        <CustomText style={[styles.text, { color }, textStyle]}>
          {icon}{text}
        </CustomText>
      )}
    </TouchableView>
  )
}


export default Button
