/* @flow */
/**
 * The core of the game.
 * It links the Board to the MobX store and navigates to the Endgame screen when needed. 
 */
import React, { Component } from 'react';
import { View } from 'react-native-animatable';
import { inject, observer } from 'mobx-react/native';
import Board from './Board';
import TimeBar from './TimeBar';
import type { Tile } from 'src/types';

import styles from './index.style';

type Props = {
  navigateToEndgame: Function,
  board: Array<Tile>,
  isGameRunning: boolean,
  isBoardValid: boolean,
  score: number,
  startGame: () => any,
  handleTilePress: (tileId: number) => any,
};

@inject(allStores => ({
  navigateToEndgame: allStores.router.navigateToEndgame,
  board: allStores.game.board,
  isGameRunning: allStores.game.isGameRunning,
  isBoardValid: allStores.game.isBoardValid,
  score: allStores.game.score,
  startGame: allStores.game.startGame,
  handleTilePress: allStores.game.handleTilePress,
}))
@observer
export default class Playground extends Component<Props, Props, void> {
  _boardRef = null;

  static defaultProps = {
    navigateToEndgame: () => null,
    board: [],
    isGameRunning: false,
    isBoardValid: false,
    score: 0,
    timeLeft: 0,
    startGame: () => null,
    handleTilePress: () => null,
  };

  componentDidMount() {
    this.props.startGame();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.isGameRunning && !this.props.isGameRunning) {
      this.props.navigateToEndgame();
    } else if (prevProps.isBoardValid && !this.props.isBoardValid) {
      if (this._boardRef) {
        this._boardRef.animateFailure();
      }
    }
  }

  _handleTilePress = (tileId: number) => {
    this.props.handleTilePress(tileId);
  };

  render() {
    const { isBoardValid, isGameRunning, board } = this.props;
    return (
      <View style={styles.container} animation={'fadeIn'}>
        {isGameRunning && <TimeBar />}
        <Board
          ref={ref => {
            this._boardRef = ref;
          }}
          tiles={board}
          onTilePress={this._handleTilePress}
          isEnabled={isBoardValid}
        />
      </View>
    );
  }
}
