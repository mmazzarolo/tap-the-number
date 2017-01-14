/* @flow */
import type { Tile } from 'src/types'

export type Action =
    { type: 'GO_TO_NEXT_LEVEL', payload: { board: Array<Tile>, level: number } }
  | { type: 'PRESS_TILE_SUCCESS', payload: { tappedTile: Tile } }
  | { type: 'PRESS_TILE_FAILURE', payload: { tappedTile: Tile } }

