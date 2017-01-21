/* @flow */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { View } from 'react-native'
import { inject, observer } from 'mobx-react/native'
import Board from 'src/components/Board'
import type { Tile } from 'src/types'

import styles from './index.style'

type Props = {
  board: Array<Tile>,
  isRunning: boolean,
  level: number,
  startGame: () => any,
  handleTilePress: (tileId: number) => any,
}

@inject((allStores) => ({
  board: allStores.game.board,
  isRunning: allStores.game.isRunning,
  level: allStores.game.level,
  startGame: allStores.game.startGame,
  handleTilePress: allStores.game.handleTilePress
}))
@observer
export default class Playground extends Component<void, Props, void> {
  componentDidMount () {
    this.props.startGame()
  }

  componentDidUpdate (prevProps: Props) {
    if (this.props.board.length === 0) {
      // this.props.goToNextLevel(6)
    }
  }

  _handleTilePress = (tileId: number) => {
    this.props.handleTilePress(tileId)
  }

  render () {
    return (
      <View style={styles.container}>
        <Board
          tiles={this.props.board}
          onTilePress={this._handleTilePress}
        />
      </View>
    )
  }
}
