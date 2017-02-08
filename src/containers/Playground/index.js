/* @flow */
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
  isRunning: boolean,
  isBoardValid: boolean,
  score: number,
  timeLeft: number,
  isBoardEmpty: boolean,
  mistakes: number,
  startGame: () => any,
  goToNextLevel: () => any,
  handleTilePress: (tileId: number) => any,
};

@inject(allStores => ({
  navigateToEndgame: allStores.router.navigateToEndgame,
  board: allStores.game.board,
  isRunning: allStores.game.isRunning,
  isBoardValid: allStores.game.isBoardValid,
  score: allStores.game.score,
  timeLeft: allStores.game.timeLeft,
  isBoardEmpty: allStores.game.board.length === 0,
  startGame: allStores.game.startGame,
  goToNextLevel: allStores.game.goToNextLevel,
  handleTilePress: allStores.game.handleTilePress,
  mistakes: allStores.game.mistakes,
}))
@observer
export default class Playground extends Component<void, Props, void> {
  _boardRef = null;

  componentDidMount() {
    this.props.startGame();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.isRunning && !this.props.isRunning) {
      this.props.navigateToEndgame();
    } else if (this.props.isBoardEmpty) {
      this.props.goToNextLevel();
    } else if (prevProps.mistakes < this.props.mistakes) {
      if (this._boardRef) {
        this._boardRef.animateFailure();
      }
    }
  }

  _handleTilePress = (tileId: number) => {
    this.props.handleTilePress(tileId);
  };

  render() {
    const { isBoardValid, timeLeft, board } = this.props;
    return (
      <View style={styles.container} animation={'fadeIn'}>
        <TimeBar timeLeft={timeLeft} />
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
