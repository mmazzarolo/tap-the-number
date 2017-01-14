/* @flow */
import type { Tile } from 'src/types'

export type Action =
    { type: 'BUILD_BOARD', payload: { board: Array<Tile>, difficulty: number } }
  | { type: 'TAP_TILE_SUCCESS', payload: { tappedTile: Tile } }
  | { type: 'TAP_TILE_FAILURE', payload: { tappedTile: Tile } }

