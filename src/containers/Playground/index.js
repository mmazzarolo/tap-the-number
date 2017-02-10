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
  isGameRunning: boolean,
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
  isGameRunning: allStores.game.isGameRunning,
  isBoardValid: allStores.game.isBoardValid,
  isBoardEmpty: allStores.game.isBoardEmpty,
  score: allStores.game.score,
  timeLeft: allStores.game.timeLeft,
  startGame: allStores.game.startGame,
  goToNextLevel: allStores.game.goToNextLevel,
  handleTilePress: allStores.game.handleTilePress,
}))
@observer
export default class Playground extends Component<void, Props, void> {
  _boardRef = null;

  componentDidMount() {
    this.props.startGame();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.isGameRunning && !this.props.isGameRunning) {
      this.props.navigateToEndgame();
    } else if (this.props.isBoardEmpty) {
      this.props.goToNextLevel();
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
