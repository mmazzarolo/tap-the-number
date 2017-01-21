/* @flow */
/* eslint-disable react/prop-types, import/no-extraneous-dependencies, import/no-unresolved*/
import React, { Component } from 'react'
import { View, Animated } from 'react-native'
import Art from 'ReactNativeART'
import AnimatedCircle from './AnimatedCircle'

const { Surface, Group, Shape, Path } = Art

const HEART_SVG = 'M130.4-0.8c25.4 0 46 20.6 46 46.1 0 13.1-5.5 24.9-14.2 33.3L88 153.6 12.5 77.3c-7.9-8.3-12.8-19.6-12.8-31.9 0-25.5 20.6-46.1 46-46.2 19.1 0 35.5 11.7 42.4 28.4C94.9 11 111.3-0.8 130.4-0.8'
const HEART_COLOR = 'rgb(226,38,77,1)'
const GRAY_HEART_COLOR = 'rgb(204,204,204,1)'

const FILL_COLORS = [
  'rgba(221,70,136,1)',
  'rgba(212,106,191,1)',
  'rgba(204,142,245,1)',
  'rgba(204,142,245,1)',
  'rgba(204,142,245,1)',
  'rgba(0,0,0,0)'
]

const PARTICLE_COLORS = [
  'rgb(158, 202, 250)',
  'rgb(161, 235, 206)',
  'rgb(208, 148, 246)',
  'rgb(244, 141, 166)',
  'rgb(234, 171, 104)',
  'rgb(170, 163, 186)'
]

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

function shuffleArray (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

const AnimatedShape = Animated.createAnimatedComponent(Shape)

type Props = {
  size: number,
  circleSize: number,
  style?: any
}

type State = {
  animation: any
}

export default class ExplodingAnimation extends Component<void, Props, State> {
  state = {
    animation: new Animated.Value(0)
  }

  componentDidMount () {
    requestAnimationFrame(() => {
      Animated.timing(this.state.animation, {
        duration: 600,
        toValue: 28
      }).start()
    })
  }

  _renderAnimatedShape = () => {
    const heartScale = this.state.animation.interpolate({
      inputRange: [0, 0.01, 6, 10, 12, 18, 28],
      outputRange: [1, 0, 0.1, 1, 1.2, 1, 1],
      extrapolate: 'clamp'
    })

    const heartFill = this.state.animation.interpolate({
      inputRange: [0, 2],
      outputRange: [GRAY_HEART_COLOR, HEART_COLOR],
      extrapolate: 'clamp'
    })

    const heartX = heartScale.interpolate({
      inputRange: [0, 1],
      outputRange: [90, 0]
    })

    const heartY = heartScale.interpolate({
      inputRange: [0, 1],
      outputRange: [75, 0]
    })

    return (
      <AnimatedShape
        d={HEART_SVG}
        x={heartX}
        y={heartY}
        scale={0.2}
        fill={heartFill}
      />
    )
  }

  _renderSmallExplosions = (radius: number, offset: Object) => {
    const getXYParticle = (total: number, i: number) => {
      const angle = ((2 * Math.PI) / total) * i
      const x = Math.round((radius * 2) * Math.cos(angle - (Math.PI / 2)))
      const y = Math.round((radius * 2) * Math.sin(angle - (Math.PI / 2)))
      return { x, y }
    }

    return [0, 1, 2, 3, 4, 5, 6].map((v, i, t) => {
      const scaleOut = this.state.animation.interpolate({
        inputRange: [0, 5.99, 6, 13.99, 14, 21],
        outputRange: [0, 0, 1, 1, 1, 0],
        extrapolate: 'clamp'
      })

      const moveUp = this.state.animation.interpolate({
        inputRange: [0, 5.99, 14],
        outputRange: [0, 0, -3],
        extrapolate: 'clamp'
      })

      const moveDown = this.state.animation.interpolate({
        inputRange: [0, 5.99, 14],
        outputRange: [0, 0, 3],
        extrapolate: 'clamp'
      })

      const colorTopParticle = this.state.animation.interpolate({
        inputRange: [6, 8, 10, 12, 17, 21],
        outputRange: shuffleArray(PARTICLE_COLORS)
      })

      const colorBottomParticle = this.state.animation.interpolate({
        inputRange: [6, 8, 10, 12, 17, 21],
        outputRange: shuffleArray(PARTICLE_COLORS)
      })

      const position = getXYParticle(7, i, radius)

      return (
        <Group
          x={position.x + offset.x}
          y={position.y + offset.y}
          rotation={getRandomInt(0, 40) * i}
          key={`small_explosion_${i}`}
        >
          <AnimatedCircle
            x={moveUp}
            y={moveUp}
            radius={4}
            scale={scaleOut}
            fill={colorTopParticle}
          />
          <AnimatedCircle
            x={moveDown}
            y={moveDown}
            radius={3}
            scale={scaleOut}
            fill={colorBottomParticle}
          />
        </Group>
      )
    }, this)
  }

  _renderAnimatedCircle = () => {
    const circleScale = this.state.animation.interpolate({
      inputRange: [0, 1, 4],
      outputRange: [0, 0.3, 1],
      extrapolate: 'clamp'
    })

    const circleStrokWidth = this.state.animation.interpolate({
      inputRange: [0, 5.99, 6, 7, 10],
      outputRange: [0, 0, 15, 8, 0],
      extrapolate: 'clamp'
    })

    const circleFillColors = this.state.animation.interpolate({
      inputRange: [1, 2, 3, 4, 4.99, 5],
      outputRange: FILL_COLORS,
      extrapolate: 'clamp'
    })

    const circleOpacity = this.state.animation.interpolate({
      inputRange: [1, 9.99, 10],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp'
    })
    return (
      <AnimatedCircle
        x={this.props.size / 2}
        y={this.props.size / 2}
        radius={this.props.circleSize / 2}
        scale={circleScale}
        strokeWidth={circleStrokWidth}
        stroke={FILL_COLORS[2]}
        fill={circleFillColors}
        opacity={circleOpacity}
      />
    )
  }

  render () {
    const circleSize = this.props.circleSize
    const tileSize = this.props.size

    return (
      <View style={this.props.style}>
        <Surface width={tileSize} height={tileSize}>
          <Group x={0} y={0}>
            {/* this._renderAnimatedShape()*/}
            {this._renderAnimatedCircle()}
            {this._renderSmallExplosions(circleSize / 4, { x: tileSize / 2, y: tileSize / 2 })}
          </Group>
        </Surface>
      </View>
    )
  }
}
