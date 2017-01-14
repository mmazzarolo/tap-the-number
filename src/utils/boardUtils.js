/* @flow */
import { inRange, random } from 'lodash'
import type { Tile } from 'src/types'
import metrics from 'src/config/metrics'

const getRandomTileColor = (): string => {
  return `#${(Math.random() * 0xFFFFFF << 0).toString(16)}`
}

// More suggestions:
// http://stackoverflow.com/questions/6224571/positioning-multiple-random-sized-absolutely-positioned-elements-so-they-dont
const getRandomTilePosition = (board: Array<Tile>): { x: number, y: number } => {
  const position = {}
  const boardWidth = metrics.DEVICE_WIDTH - metrics.BOARD_MARGIN
  const boardHeight = metrics.DEVICE_HEIGHT - metrics.BOARD_MARGIN
  while (true) {
    const randomX = random(0, boardWidth - metrics.TILE_SIZE)
    const randomY = random(0, boardHeight - metrics.TILE_SIZE)
    if (_isPositionAvailable(randomX, randomY, board)) {
      position.x = randomX
      position.y = randomY
      break
    }
  }
  return position
}

const _isPositionAvailable = (x: number, y: number, board: Array<Tile>): boolean => {
  for (const boardTile of board) {
    if (_doPositionsOverlap(x, y, boardTile.x, boardTile.y)) {
      return false
    }
  }
  return true
}

const _doPositionsOverlap = (x1: number, y1: number, x2: number, y2: number): boolean => {
  const xOverlap = inRange(x1, x2, x2 + metrics.TILE_SIZE)
    || inRange(x2, x1, x1 + metrics.TILE_SIZE)
  const yOverlap = inRange(y1, y2, y2 + metrics.TILE_SIZE)
    || inRange(y2, y1, y1 + metrics.TILE_SIZE)
  return xOverlap && yOverlap
}

export default {
  getRandomTileColor,
  getRandomTilePosition
}
