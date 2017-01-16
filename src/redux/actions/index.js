/* @flow */
import { find, orderBy, random, times } from 'lodash'
import type { Action } from 'src/redux/types'
import type { Tile } from 'src/types'
import boardUtils from 'src/utils/boardUtils'

const goToNextLevel = (level: number): Action => {
  const board = []

  times(level, (n) => {
    const id = n
    const { x, y } = boardUtils.getRandomTilePosition(board)
    const number = random(-100, 100)
    const color = boardUtils.getRandomTileColor()
    const isVisible = true
    board.push({ id, x, y, number, color, isVisible })
  })

  return {
    type: 'GO_TO_NEXT_LEVEL',
    payload: { board, level }
  }
}

const pressTile = (board: Array<Tile>, tileId: number): Action => {
  const tappedTile = find(board, { id: tileId })
  const sortedBoard = orderBy(board, 'number')
  // if (tappedTile.number === sortedBoard[0].number) {
  return { type: 'PRESS_TILE_SUCCESS', payload: { tappedTile } }
  // } else {
  //   return { type: 'PRESS_TILE_FAILURE', payload: { tappedTile } }
  // }
}

export default {
  goToNextLevel,
  pressTile
}
