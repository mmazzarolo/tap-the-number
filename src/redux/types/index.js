/* @flow */
import type { Tile } from 'src/types'

export type Action =
   { type: 'BUILD_BOARD', payload: { board: Array<Tile>, difficulty: number } }
