/* @flow */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { View, Text } from 'react-native-animatable'
import { observer } from 'mobx-react/native'
import colorUtils from 'src/utils/colorUtils'
import metrics from 'src/config/metrics'
import styles from './index.style'

type DefaultProps = {
  depth: number,
  borderRadius: number,
}

type Props = {
  depth?: number,
  backgroundColor: string,
  borderRadius?: number,
  text: string | number,
  textStyle?: any,
  onPress?: () => void,
  onRelease?: () => void,
  animation?: string,
  style?: any
}

type State = {
  isTouched: boolean
}

@observer
export default class BoardTile extends Component<DefaultProps, Props, State> {
  static defaultProps = {
    depth: metrics.TILE_SHADOW_DEPTH,
    borderRadius: metrics.TILE_BORDER_RADIUS
  }

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
    const { animation, depth, borderRadius, backgroundColor, text, textStyle, style } = this.props
    const { isTouched } = this.state
    const halfDepth = depth / 2
    const tileStyle = {
      marginTop: (isTouched) ? depth : halfDepth,
      backgroundColor,
      borderRadius
    }
    const depthStyle = {
      marginTop: -borderRadius,
      height: (isTouched) ? (halfDepth + borderRadius) : depth + borderRadius,
      backgroundColor: colorUtils.getDifferentLuminance(backgroundColor, -0.2),
      borderBottomLeftRadius: borderRadius,
      borderBottomRightRadius: borderRadius
    }
    return (
      <View
        ref={(ref) => { this._containerRef = ref }}
        animation={animation}
        onStartShouldSetResponder={this._handlePress}
        onResponderRelease={this._handleRelease}
      >
        <View style={[styles.tile, tileStyle, style]}>
          <Text style={[styles.text, textStyle]}>
            {text}
          </Text>
        </View>
        <View style={[styles.depth, depthStyle]} />
      </View>
    )
  }
}

