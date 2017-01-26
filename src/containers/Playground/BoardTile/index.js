/* @flow */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { View, Text } from 'react-native-animatable'
import { noop } from 'lodash'
import { observer } from 'mobx-react/native'
import colorUtils from 'src/utils/colorUtils'
import metrics from 'src/config/metrics'
import styles from './index.style'

type Props = {
  isVisible: boolean,
  left: number,
  bottom: number,
  backgroundColor: string,
  text: string | number,
  onTilePress: Function
}

type State = {
  isTouched: boolean,
  isAnimatingFailure: boolean
}

@observer
export default class BoardTile extends Component<void, Props, State> {
  state = {
    isTouched: false,
    isAnimatingFailure: false
  }

  _tileRef = null

  _handlePress = () => {
    this.setState({ isTouched: true })
    return true
  }

  _handleRelease = () => {
    this.props.onTilePress()
  }

  animateFailure = async () => {
    this.setState({ isAnimatingFailure: true })
    if (this._tileRef) {
      await this._tileRef.swing(400)
    }
    if (this._tileRef) {
      await this._tileRef.bounceOut(450)
    }
    this.setState({ isAnimatingFailure: false })
  }

  render () {
    const { left, bottom, backgroundColor, text, isVisible } = this.props
    const { isAnimatingFailure, isTouched } = this.state
    const containerStyle = {
      left,
      bottom,
      width: metrics.TILE_SIZE,
      height: metrics.TILE_SIZE
    }
    const depthStyle = {
      left: 0,
      bottom: 0,
      width: metrics.TILE_SIZE - metrics.TILE_SHADOW_DEPTH,
      height: metrics.TILE_SIZE - metrics.TILE_SHADOW_DEPTH,
      backgroundColor: colorUtils.getDifferentLuminance(backgroundColor, -0.2),
      borderRadius: metrics.TILE_SIZE * 0.1
    }
    const tileStyle = {
      left: 0,
      bottom: (isTouched) ? (metrics.TILE_SHADOW_DEPTH / 2) : metrics.TILE_SHADOW_DEPTH,
      width: metrics.TILE_SIZE - metrics.TILE_SHADOW_DEPTH,
      height: metrics.TILE_SIZE - metrics.TILE_SHADOW_DEPTH,
      backgroundColor,
      borderRadius: metrics.TILE_SIZE * 0.1
    }
    if (!isVisible) return null
    return (
      <View
        ref={(ref) => { this._tileRef = ref }}
        animation={'bounceIn'}
        style={[styles.container, containerStyle]}
        onStartShouldSetResponder={isAnimatingFailure ? noop : this._handlePress}
        onResponderRelease={isAnimatingFailure ? noop : this._handleRelease}
      >
        <View style={[styles.depth, depthStyle]} />
        <View style={[styles.tile, tileStyle]}>
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    )
  }
}

