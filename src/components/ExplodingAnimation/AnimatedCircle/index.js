/* @flow */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { Animated } from 'react-native'
import Art from 'ReactNativeART'

const { Shape, Path } = Art

const AnimatedShape = Animated.createAnimatedComponent(Shape)

type Props = {
  radius: number
}

export default class AnimatedCircle extends Component<void, Props, void> {
  render () {
    const { radius, ...otherProps } = this.props
    const path = Path().moveTo(0, -radius)
        .arc(0, radius * 2, radius)
        .arc(0, radius * -2, radius)
        .close()
    return (
      <AnimatedShape d={path} {...otherProps} />
    )
  }
}
