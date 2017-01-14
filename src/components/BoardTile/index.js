/* @flow */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { View, Text } from 'react-native-animatable'
import metrics from 'src/config/metrics'
import type { Tile } from 'src/types'

import styles from './index.style'

type Props = {
  left: number,
  bottom: number,
  backgroundColor: string,
  text: string | number,
  style: ?any
}

export default class BoardTile extends Component<void, Props, void> {
  render () {
    const { left, bottom, backgroundColor, text, style } = this.props
    const computedStyle = {
      width: metrics.TILE_SIZE,
      height: metrics.TILE_SIZE,
      left,
      bottom,
      backgroundColor
    }
    return (
      <View style={[computedStyle, styles.containerDefault, style]}>
        <Text style={styles.text}>{text}</Text>
      </View>
    )
  }
}
