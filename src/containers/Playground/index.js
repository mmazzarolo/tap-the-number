/* @flow */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { View } from 'react-native'
import { inject, observer } from 'mobx-react/native'
import { connect } from 'react-redux'
import actions from 'src/redux/actions'
import Board from 'src/components/Board'
import type { Tile } from 'src/types'

import styles from './index.style'

// const mapStateToProps = (state) => ({
//   board: state.game.board,
//   isRunning: state.game.isRunning,
//   level: state.game.level
// })

// type Props = {
//   gameState: GameState,
//   board: Array<Tile>,
//   isRunning: boolean,
//   level: number,
//   pressTile: (board: Array<Tile>, tileId: number) => any,
//   goToNextLevel: (difficulty: number) => any
// }

// @connect(mapStateToProps, actions)

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
    // this.props.goToNextLevel(6)
    this.props.startGame()
  }

  componentDidUpdate (prevProps: Props) {
    if (this.props.board.length === 0) {
      this.props.goToNextLevel(6)
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
