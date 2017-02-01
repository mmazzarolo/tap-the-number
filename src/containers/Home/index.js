/* @flow */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { View } from 'react-native-animatable'
import { inject, observer } from 'mobx-react/native'
import metrics from 'src/config/metrics'

import Tile from 'src/components/Tile'
import styles from './index.style'

type Props = {
  navigateToEndgame: () => void
}

@inject((allStores) => ({
  navigateToPlayground: allStores.router.navigateToPlayground,
  navigateToEndgame: allStores.router.navigateToEndgame
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
          onRelease={this.props.navigateToEndgame}
          style={styles.button}
          textStyle={styles.buttonText}
        />
      </View>
    )
  }
}
