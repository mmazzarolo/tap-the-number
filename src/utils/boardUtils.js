/* @flow */
import { inRange, random } from 'lodash';
import type { Tile } from 'src/types';
import metrics from 'src/config/metrics';
import colors from 'src/config/colors';

/**
 * Gets randomly one of the available tile colors.
 * @param {Array<string>} blacklist - An array with the already picked colors.
 * @return {string} A random color.
 */
const getRandomTileColor = (blacklist: Array<string> = []): string => {
  const randomIndex = random(0, colors.TILES.length - 1);
  const randomColor = colors.TILES[randomIndex];
  return blacklist.includes(randomColor) ? getRandomTileColor(blacklist) : randomColor;
};

/**
 * Gets a random tile position (making sure that it does not overlap another tile).
 * @param {Array<Tile>} blacklist - An array the already placed tiles.
 * @return {Object} An object with the x and y coordinates of the tile.
 */
const getRandomTilePosition = (board: Array<Tile>): { x: number, y: number } => {
  const position = {};
  const boardOriginX = metrics.BOARD_MARGIN;
  const boardOriginY = metrics.BOARD_MARGIN;
  const boardWidth = metrics.BOARD_WIDTH - metrics.BOARD_MARGIN;
  const boardHeight = metrics.BOARD_HEIGHT - metrics.BOARD_MARGIN;
  // Gets random tile positions until it finds a position that does not overlap another tile.
  // The while loop is a bit scary but we don't have to worry: we're using relative metrics
  // and we're limiting the number of tiles.
  while (true) {
    const randomX = random(boardOriginX, boardWidth - metrics.TILE_SIZE);
    const randomY = random(boardOriginY, boardHeight - metrics.TILE_SIZE);
    if (_isPositionAvailable(randomX, randomY, board)) {
      position.x = randomX;
      position.y = randomY;
      break;
    }
  }
  return position;
};

const _isPositionAvailable = (x: number, y: number, board: Array<Tile>): boolean => {
  for (const boardTile of board) {
    if (_doPositionsOverlap(x, y, boardTile.x, boardTile.y)) {
      return false;
    }
  }
  return true;
};

const _doPositionsOverlap = (x1: number, y1: number, x2: number, y2: number): boolean => {
  const tileSize = metrics.TILE_SIZE + metrics.TILE_SHADOW_DEPTH;
  const xOverlap = inRange(x1, x2, x2 + tileSize) || inRange(x2, x1, x1 + tileSize);
  const yOverlap = inRange(y1, y2, y2 + tileSize) || inRange(y2, y1, y1 + tileSize);
  return xOverlap && yOverlap;
};

/**
 * Gets a random tile number for a given level.
 * @param {number} level - The current game level.
 * @param {Array<number>} blacklist - An array the already picked numbers.
 * @return {number} A random number.
 */
const getRandomNumber = (level: number, blacklist: Array<number> = []): number => {
  let randomNumber;
  if (level === 1) {
    randomNumber = random(0, 9);
  } else if (level <= 3) {
    randomNumber = random(0, 29);
  } else if (level <= 5) {
    randomNumber = random(-9, 39);
  } else if (level <= 7) {
    randomNumber = random(-29, 69);
  } else {
    randomNumber = random(-99, 99);
  }
  return blacklist.includes(randomNumber) ? getRandomNumber(level, blacklist) : randomNumber;
};

/**
 * Gets a the number of tiles that must be created for a specific level.
 * @param {number} level - The current game level.
 * @return {number} The number of tile to create.
 */
const getNumberOfTiles = (level: number): number => {
  const minimNumberOfTiles = 3;
  const maximumNumberOfTiles = 6;
  const incrementFactor = level * 0.2;
  const numberOfTiles = Math.floor(minimNumberOfTiles + incrementFactor);
  return numberOfTiles < maximumNumberOfTiles ? numberOfTiles : maximumNumberOfTiles;
};

export default {
  getRandomTileColor,
  getRandomTilePosition,
  getRandomNumber,
  getNumberOfTiles,
};
