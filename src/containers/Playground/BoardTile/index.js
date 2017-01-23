/* @flow */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { View, Text } from 'react-native-animatable'
import { observer } from 'mobx-react/native'
import colorUtils from 'src/utils/colorUtils'
import ExplodingAnimation from 'src/components/ExplodingAnimation'
import metrics from 'src/config/metrics'
import styles from './index.style'

type Props = {
  isVisible: boolean,
  left: number,
  bottom: number,
  backgroundColor: string,
  text: string | number,
  onTilePress: Function,
  style?: any
}

type State = {
  isVisible: boolean
}

@observer
export default class BoardTile extends Component<void, Props, State> {
  state = {
    isVisible: true
  }

  // componentDidUpdate (prevProps: Props) {
  //   const previouslyVisible = prevProps.isVisible
  //   const currentlyVisible = this.props.isVisible
  //   if (previouslyVisible && !currentlyVisible) {

  //   }
  // }

  render () {
    const { left, bottom, backgroundColor, text, style, isVisible } = this.props
    const EXPLOSION_PADDING = metrics.TILE_SIZE * 0.1
    const CIRCLE_SIZE = metrics.TILE_SIZE - (EXPLOSION_PADDING * 2)
    const computedCircleStyle = {
      left: left + EXPLOSION_PADDING,
      bottom: bottom + EXPLOSION_PADDING,
      backgroundColor,
      borderRadius: CIRCLE_SIZE * 0.1,
      width: CIRCLE_SIZE,
      height: CIRCLE_SIZE,
      shadowColor: colorUtils.getDifferentLuminance(backgroundColor, -0.2)
    }
    const computedExplosionStyle = {
      left,
      bottom,
      width: metrics.TILE_SIZE,
      height: metrics.TILE_SIZE
    }
    const textColor = colorUtils.getContrastYIQ(backgroundColor)
    if (isVisible) {
      return (
        <View
          animation={'bounceIn'}
          style={[computedCircleStyle, styles.containerDefault, style]}
          onStartShouldSetResponder={this.props.onTilePress}
        >
          <Text style={[styles.text, { color: textColor }]}>{text}</Text>
        </View>
      )
    } else {
      return (
        <ExplodingAnimation
          style={[computedExplosionStyle, styles.explosionDefault]}
          size={metrics.TILE_SIZE}
          circleSize={CIRCLE_SIZE}
        />
      )
    }
  }
}

