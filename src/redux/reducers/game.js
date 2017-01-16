/* @flow */
import { findIndex } from 'lodash'
import type { Action } from 'src/redux/types'
import type { Tile } from 'src/types'

// ===========================
//   STATE TYPE
// ===========================
export type State = {
  board: Array<Tile>,
  isRunning: boolean,
  score: number,
  level: number
}

// ===========================
//   INITIAL STATE
// ===========================
export const initialState: State = {
  board: [],
  isRunning: false,
  level: 0,
  score: 0
}

// ===========================
//   REDUCER
// ===========================
export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'GO_TO_NEXT_LEVEL': {
      return {
        ...state,
        board: action.payload.board,
        level: state.level + 1,
        isRunning: true
      }
    }

    case 'PRESS_TILE_SUCCESS': {
      const tappedTileId = action.payload.tappedTile.id
      const nextBoard = state.board.slice()
      const tileIndex = findIndex(nextBoard, { id: tappedTileId })
      nextBoard[tileIndex].isVisible = false
      const score = state.score + 1
      return { ...state, board: nextBoard, score }
    }

    case 'PRESS_TILE_FAILURE': {
      const score = state.score - 10
      return { ...state, board: [], score }
    }

    default:
      return state
  }
}

// ===========================
//   SELECTORS
// ===========================
// export const getVisibleTiles = ({ game }: { game: State}): Array<Tile> => {
  // return takeRight(game.tiles, 5)
// }
