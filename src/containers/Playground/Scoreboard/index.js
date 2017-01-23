/* @flow */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { View, Text } from 'react-native-animatable'
import { observer } from 'mobx-react/native'
import styles from './index.style'

type Props = {
  score: number,
  timeLeft: number
}

@observer
export default class Scoreboard extends Component<void, Props, void> {
  render () {
    return (
      <View style={styles.container} >
        <View style={styles.textContainer}>
          <Text style={styles.text}>Score</Text>
          <Text style={styles.text}>{this.props.score}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Time</Text>
          <Text style={styles.text}>{this.props.timeLeft}</Text>
        </View>
      </View>
    )
  }
}

