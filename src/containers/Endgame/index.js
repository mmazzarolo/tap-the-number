/* @flow */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { LayoutAnimation } from 'react-native'
import { View } from 'react-native-animatable'
import { inject, observer } from 'mobx-react/native'
import metrics from 'src/config/metrics'

import CircleAnimation from 'src/components/CircleAnimation'
import Playground from 'src/containers/Playground'
import Home from 'src/containers/Home'
import styles from './index.style'

type Props = {
  isRunning: boolean,
  mistakes: number,
  startGame: () => void
}

@inject((allStores) => ({
  isRunning: allStores.game.isRunning,
  mistakes: allStores.game.mistakes,
  startGame: allStores.game.startGame
}))
@observer
export default class Endgame extends Component<void, Props, void> {
  render () {
    return (
      <View style={{ flex: 1 }}>
        <CircleAnimation
          backgroundColor={'black'}
          isVisible={true}
        >
          <View animation={'zoomIn'} delay={300} style={styles.container} />
        </CircleAnimation>
      </View>
    )
  }
}
