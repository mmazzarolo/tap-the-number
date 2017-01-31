/* @flow */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { LayoutAnimation } from 'react-native'
import { View } from 'react-native-animatable'
import { inject, observer } from 'mobx-react/native'
import metrics from 'src/config/metrics'

import CircleAnimation from 'src/components/CircleAnimation'
import Tile from 'src/components/Tile'
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
  render () {
    return (
      <View style={styles.container}>
        <Tile
          width={metrics.DEVICE_WIDTH / 2}
          height={90}
          depth={metrics.TILE_SHADOW_DEPTH}
          backgroundColor={'#BC0437'}
          borderRadius={metrics.TILE_SIZE * 0.1}
          text={'START'}
          onRelease={this.props.startGame}
          style={styles.button}
        />
      </View>
    )
  }
}
