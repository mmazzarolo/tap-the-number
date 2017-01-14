/* @flow */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { View, Text } from 'react-native-animatable'
import TouchableView from 'src/components/TouchableView'
import colorUtils from 'src/utils/colorUtils'

import styles from './index.style'

type Props = {
  left: number,
  bottom: number,
  backgroundColor: string,
  text: string | number,
  onTilePress: Function,
  style?: any
}

export default class BoardTile extends Component<void, Props, void> {
  render () {
    const { left, bottom, backgroundColor, text, style } = this.props
    const computedStyle = {
      left,
      bottom,
      backgroundColor
    }
    const textColor = colorUtils.getContrastYIQ(backgroundColor)
    return (
      <TouchableView
        style={[computedStyle, styles.containerDefault, style]}
        onPress={this.props.onTilePress}
      >
        <Text style={[styles.text, { color: textColor }]}>{text}</Text>
      </TouchableView>
    )
  }
}

