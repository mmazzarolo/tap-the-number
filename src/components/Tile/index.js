/* @flow */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { View, Text } from 'react-native-animatable'
import { observer } from 'mobx-react/native'
import colorUtils from 'src/utils/colorUtils'
import metrics from 'src/config/metrics'
import styles from './index.style'

type Props = {
  width: number,
  height: number,
  depth: number,
  backgroundColor: string,
  borderRadius: number,
  text?: string | number,
  onPress?: () => void,
  onRelease?: () => void,
  style?: any
}

type State = {
  isTouched: boolean
}

@observer
export default class BoardTile extends Component<void, Props, State> {
  state = {
    isTouched: false
  }

  _containerRef = null

  getContainerRef = () => this._containerRef

  _handlePress = () => {
    if (this.props.onPress) {
      this.props.onPress()
    }
    this.setState({ isTouched: true })
    return true
  }

  _handleRelease = () => {
    if (this.props.onRelease) {
      this.props.onRelease()
    }
    this.setState({ isTouched: false })
  }

  render () {
    const { width, height, depth, borderRadius, backgroundColor, text, style } = this.props
    const { isTouched } = this.state
    const containerStyle = {
      width,
      height: metrics.TILE_SIZE
    }
    const depthStyle = {
      left: 0,
      bottom: 0,
      width,
      height: height - depth,
      backgroundColor: colorUtils.getDifferentLuminance(backgroundColor, -0.2),
      borderRadius
    }
    const tileStyle = {
      left: 0,
      bottom: (isTouched) ? (depth / 2) : depth,
      width,
      height: height - depth,
      backgroundColor,
      borderRadius: metrics.TILE_SIZE * 0.1
    }
    return (
      <View
        ref={(ref) => { this._containerRef = ref }}
        animation={'bounceIn'}
        style={[styles.container, containerStyle, style]}
        onStartShouldSetResponder={this._handlePress}
        onResponderRelease={this._handleRelease}
      >
        <View style={[styles.depth, depthStyle]} />
        <View style={[styles.tile, tileStyle]}>
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    )
  }
}

