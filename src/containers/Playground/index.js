/* @flow */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import actions from 'src/redux/actions'
import Board from 'src/components/Board'
import type { Tile } from 'src/types'

import styles from './index.style'

const mapStateToProps = (state) => ({
  board: state.game.board,
  isRunning: state.game.isRunning,
  level: state.game.level
})

type Props = {
  board: Array<Tile>,
  isRunning: boolean,
  level: number,
  buildBoard: (difficulty: number) => any,
  pressTile: (board: Array<Tile>, tileId: number) => any,
  goToNextLevel: () => any
}

@connect(mapStateToProps, actions)
export default class Playground extends Component<void, Props, void> {
  componentDidMount () {
    this.props.buildBoard(6)
  }

  componentDidUpdate (prevProps: Props) {
    if (this.props.board.length === 0) {
      this.props.goToNextLevel()
    }
  }

  _handleTilePress = (tileId: number) => {
    this.props.pressTile(this.props.board, tileId)
  }

  render () {
    return (
      <View style={styles.container}>
        <Board
          tiles={this.props.board}
          pressTile={this._handleTilePress}
        />
      </View>
    )
  }
}
