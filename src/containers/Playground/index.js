/* @flow */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { Image, View } from 'react-native'
import { inject, observer } from 'mobx-react/native'
import Board from 'src/containers/Playground/Board'
import Scoreboard from 'src/containers/Playground/Scoreboard'
import type { Tile } from 'src/types'
import bgImg from 'src/images/bg.jpg'

import styles from './index.style'

type Props = {
  board: Array<Tile>,
  isRunning: boolean,
  score: number,
  timeLeft: number,
  isBoardEmpty: boolean,
  startGame: () => any,
  goToNextLevel: () => any,
  handleTilePress: (tileId: number) => any,
}

@inject((allStores) => ({
  board: allStores.game.board,
  isRunning: allStores.game.isRunning,
  score: allStores.game.score,
  timeLeft: allStores.game.timeLeft,
  isBoardEmpty: allStores.game.board.length === 0,
  startGame: allStores.game.startGame,
  goToNextLevel: allStores.game.goToNextLevel,
  handleTilePress: allStores.game.handleTilePress
}))
@observer
export default class Playground extends Component<void, Props, void> {
  componentDidMount () {
    this.props.startGame()
  }

  componentDidUpdate (prevProps: Props) {
    if (this.props.isBoardEmpty) {
      this.props.goToNextLevel()
    }
  }

  _handleTilePress = (tileId: number) => {
    this.props.handleTilePress(tileId)
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Scoreboard
            score={this.props.score}
            timeLeft={this.props.timeLeft}
          />
          <Board
            tiles={this.props.board}
            onTilePress={this._handleTilePress}
          />
        </View>
      </View>
    )
  }
}
