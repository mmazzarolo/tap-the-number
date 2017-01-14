/* @flow */
import { times, random } from 'lodash'
import type { Action } from 'src/redux/types'
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

export default {
  buildBoard
}
