/* @flow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Provider } from 'mobx-react/native'

import Playground from 'src/containers/Playground'
import GameState from 'src/state/game'

const gameState = new GameState()

export class Numberz extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Provider gameState={gameState}>
          <Playground gameState={gameState} />
        </Provider>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default Numberz
