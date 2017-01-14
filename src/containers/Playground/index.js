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
  pressTile: (board: Array<Tile>, tileId: number) => any,
  goToNextLevel: (difficulty: number) => any
}

@connect(mapStateToProps, actions)
export default class Playground extends Component<void, Props, void> {
  componentDidMount () {
    this.props.goToNextLevel(6)
  }

  componentDidUpdate (prevProps: Props) {
    if (this.props.board.length === 0) {
      this.props.goToNextLevel(6)
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
          onTilePress={this._handleTilePress}
        />
      </View>
    )
  }
}
