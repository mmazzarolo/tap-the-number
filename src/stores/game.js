/* @flow */
import { action, computed, observable } from 'mobx';
import { filter, find, orderBy, times } from 'lodash';
import timings from 'src/config/timings';
import boardUtils from 'src/utils/boardUtils';
import timeUtils from 'src/utils/timeUtils';
import audioService from 'src/services/audio';
import type { Tile } from 'src/types';
import uuid from 'uuid';

export default class GameStore {
  @observable tiles: Array<Tile> = [];
  @observable isRunning: boolean = false;
  @observable isEndgame: boolean = false;
  @observable isBoardValid: boolean = false;
  @observable level: number = 0;
  @observable score: number = 0;
  @observable mistakes: number = 0;

  @action buildBoard = () => {
    this.tiles = [];
    this.isBoardValid = true;
    const numberOfTiles = boardUtils.getNumberOfTiles(this.level);
    const alreadyPickedNumbers = [];
    times(numberOfTiles, n => {
      const id = uuid.v4();
      const { x, y } = boardUtils.getRandomTilePosition(this.tiles);
      const number = boardUtils.getRandomNumber(this.level, alreadyPickedNumbers);
      const color = boardUtils.getRandomTileColor();
      const isVisible = true;
      alreadyPickedNumbers.push(number);
      this.tiles.push({ id, x, y, number, color, isVisible });
    });
  };

  @action startGame = () => {
    this.level = 1;
    this.isRunning = true;
    this.buildBoard();
    this.startTimer();
  };

  @action goToNextLevel = () => {
    this.level++;
    this.buildBoard();
  };

  @action startTimer = async () => {
    await timeUtils.delay(timings.TIME_LIMIT_MS);
    this.isRunning = false;
  };

  @action handleTilePress = async (tileId: string) => {
    const pressedTile = find(this.tiles, { id: tileId });
    const activeTiles = filter(this.tiles, 'isVisible');
    const sortedActiveTiles = orderBy(activeTiles, 'number');
    if (pressedTile.number === sortedActiveTiles[0].number) {
      pressedTile.isVisible = false;
      this.score++;
    } else {
      this.mistakes++;
      this.isBoardValid = false;
      audioService.playFailureSound();
      await timeUtils.delay(1000); // Wait for the "failure" animation
      this.buildBoard();
    }
  };

  @computed get board(): Array<Tile> {
    return this.tiles.slice().filter(t => t.isVisible === true);
  }
}
