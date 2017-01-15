import React, { Component } from 'react'

import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Animated
} from 'react-native'

import Art from 'ReactNativeART'
import metrics from 'src/config/metrics'

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

function getXYParticle (total, i, radius) {
  const angle = ((2 * Math.PI) / total) * i

  const x = Math.round((radius * 2) * Math.cos(angle - (Math.PI / 2)))
  const y = Math.round((radius * 2) * Math.sin(angle - (Math.PI / 2)))
  return {
    x,
    y
  }
}

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


const {
  Surface,
  Group,
  Shape,
  Path
} = Art

const AnimatedShape = Animated.createAnimatedComponent(Shape)

export default class ExplodingAnimation extends Component {
  state = {
    animation: new Animated.Value(0)
  }

  _explode = () => {
    Animated.timing(this.state.animation, {
      duration: 1500,
      toValue: 28
    }).start(() => {
      this.state.animation.setValue(0)
      this.forceUpdate()
    })
  }

  _getSmallExplosions = (radius, offset) => {
    return [0, 1, 2, 3, 4, 5, 6].map((v, i, t) => {
      const scaleOut = this.state.animation.interpolate({
        inputRange: [0, 5.99, 6, 13.99, 14, 21],
        outputRange: [0, 0, 1, 1, 1, 0],
        extrapolate: 'clamp'
      })

      const moveUp = this.state.animation.interpolate({
        inputRange: [0, 5.99, 14],
        outputRange: [0, 0, -15],
        extrapolate: 'clamp'
      })

      const moveDown = this.state.animation.interpolate({
        inputRange: [0, 5.99, 14],
        outputRange: [0, 0, 15],
        extrapolate: 'clamp'
      })

      const color_top_particle = this.state.animation.interpolate({
        inputRange: [6, 8, 10, 12, 17, 21],
        outputRange: shuffleArray(PARTICLE_COLORS)
      })

      const color_bottom_particle = this.state.animation.interpolate({
        inputRange: [6, 8, 10, 12, 17, 21],
        outputRange: shuffleArray(PARTICLE_COLORS)
      })

      const position = getXYParticle(7, i, radius)

      return (
        <Group
          x={position.x + offset.x}
          y={position.y + offset.y}
          rotation={getRandomInt(0, 40) * i}
        >
          <AnimatedCircle
            x={moveUp}
            y={moveUp}
            radius={15}
            scale={scaleOut}
            fill={color_top_particle}
          />
          <AnimatedCircle
            x={moveDown}
            y={moveDown}
            radius={8}
            scale={scaleOut}
            fill={color_bottom_particle}
          />
        </Group>
      )
    }, this)
  }

  render () {
    const heart_scale = this.state.animation.interpolate({
      inputRange: [0, 0.01, 6, 10, 12, 18, 28],
      outputRange: [1, 0, 0.1, 1, 1.2, 1, 1],
      extrapolate: 'clamp'
    })

    const heart_fill = this.state.animation.interpolate({
      inputRange: [0, 2],
      outputRange: [GRAY_HEART_COLOR, HEART_COLOR],
      extrapolate: 'clamp'
    })

    const heart_x = heart_scale.interpolate({
      inputRange: [0, 1],
      outputRange: [90, 0]
    })

    const heart_y = heart_scale.interpolate({
      inputRange: [0, 1],
      outputRange: [75, 0]
    })

    const circle_scale = this.state.animation.interpolate({
      inputRange: [0, 1, 4],
      outputRange: [0, 0.3, 1],
      extrapolate: 'clamp'
    })

    const circle_stroke_width = this.state.animation.interpolate({
      inputRange: [0, 5.99, 6, 7, 10],
      outputRange: [0, 0, 15, 8, 0],
      extrapolate: 'clamp'
    })

    const circle_fill_colors = this.state.animation.interpolate({
      inputRange: [1, 2, 3, 4, 4.99, 5],
      outputRange: FILL_COLORS,
      extrapolate: 'clamp'
    })

    const circle_opacity = this.state.animation.interpolate({
      inputRange: [1, 9.99, 10],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp'
    })

    const tileSize = metrics.TILE_SIZE
    const size = metrics.TILE_SIZE * 1.6

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this._explode} style={styles.container}>
          <View>
            <Surface width={size} height={size}>
              <Group x={0} y={0}>
                {/* <AnimatedShape
                  d={HEART_SVG}
                  x={heart_x}
                  y={heart_y}
                  scale={0.2}
                  fill={heart_fill}
                />*/}
                <AnimatedCircle
                  x={size / 2}
                  y={size / 2}
                  radius={tileSize / 2}
                  scale={circle_scale}
                  strokeWidth={circle_stroke_width}
                  stroke={FILL_COLORS[2]}
                  fill={circle_fill_colors}
                  opacity={circle_opacity}
                />

                {this._getSmallExplosions(
                  tileSize / 4,
                  { x: size / 2, y: size / 2 }
                  )
                }
              </Group>
            </Surface>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}


/*

 */
const AnimatedCircle = React.createClass({ displayName: 'Circle',
  render () {
    const radius = this.props.radius
    const path = Path().moveTo(0, -radius)
        .arc(0, radius * 2, radius)
        .arc(0, radius * -2, radius)
        .close()
    return React.createElement(AnimatedShape, React.__spread({}, this.props, { d: path }))
  }
})

let styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
