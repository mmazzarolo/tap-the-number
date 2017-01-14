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
  difficulty: state.game.difficulty
})

type Props = {
  board: Array<Tile>,
  isRunning: boolean,
  difficulty: number,
  buildBoard: (difficulty: number) => any
}

@connect(mapStateToProps, actions)
export default class Playground extends Component<void, Props, void> {
  componentDidMount () {
    this.props.buildBoard(6)
  }

  render () {
    return (
      <View style={styles.container}>
        <Board tiles={this.props.board} />
      </View>
    )
  }
}
