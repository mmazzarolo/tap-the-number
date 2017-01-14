/* @flow */
import { find, orderBy, random, times } from 'lodash'
import type { Action } from 'src/redux/types'
import type { Tile } from 'src/types'
import boardUtils from 'src/utils/boardUtils'

const buildBoard = (difficulty: number): Action => {
  const board = []

  times(difficulty, (n) => {
    const id = n
    const { x, y } = boardUtils.getRandomTilePosition(board)
    const number = random(-100, 100)
    const color = boardUtils.getRandomTileColor()
    board.push({ id, x, y, number, color })
  })

  return {
    type: 'BUILD_BOARD',
    payload: { board, difficulty }
  }
}

const tapTile = (board: Array<Tile>, tileId: number): Action => {
  const tappedTile = find(board, { id: tileId })
  const sortedBoard = orderBy(board, 'number')
  if (tappedTile.number === sortedBoard[0].number) {
    return { type: 'TAP_TILE_SUCCESS', payload: { tappedTile } }
  } else {
    return { type: 'TAP_TILE_FAILURE', payload: { tappedTile } }
  }
}

export default {
  buildBoard,
  tapTile
}
