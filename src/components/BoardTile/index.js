/* @flow */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { View, Text } from 'react-native-animatable'
import TouchableView from 'src/components/TouchableView'

import styles from './index.style'

type Props = {
  left: number,
  bottom: number,
  backgroundColor: string,
  text: string | number,
  onTileTap: Function,
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
    const textColor = getContrastYIQ(backgroundColor)
    return (
      <TouchableView
        style={[computedStyle, styles.containerDefault, style]}
        onPress={this.props.onTileTap}
      >
        <Text style={[styles.text, { color: textColor }]}>{text}</Text>
      </TouchableView>
    )
  }
}

const getContrastYIQ = (hc) => {
  const [r, g, b] = [1, 3, 5].map(p => parseInt(hc.substr(p, 2), 16))
  return ((r * 299) + (g * 587) + (b * 114)) / 1000 >= 128 ? 'black' : 'white'
}
