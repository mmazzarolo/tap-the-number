/* @flow */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { LayoutAnimation } from 'react-native'
import { View } from 'react-native-animatable'
import { inject, observer } from 'mobx-react/native'
import metrics from 'src/config/metrics'

import CircleAnimation from 'src/components/CircleAnimation'
import Playground from 'src/containers/Playground'
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
export default class App extends Component<void, Props, void> {
  componentDidMount () {
    this.props.startGame()
  }

  componentDidUpdate (prevProps: Props) {
    if (prevProps.mistakes < this.props.mistakes) {
      // LayoutAnimation.linear()
    }
  }

  render () {
    return (
      <View style={styles.container}>
        {(this.props.isRunning) ? <Playground /> : <View />}
        <CircleAnimation
          isVisible={!this.props.isRunning}
          backgroundColor={'black'}
        />
      </View>
    )
  }
}
