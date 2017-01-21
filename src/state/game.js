/* @flow */
import { action, computed, observable } from 'mobx'
import { filter, find, orderBy, random, times } from 'lodash'
import boardUtils from 'src/utils/boardUtils'
import type { Tile } from 'src/types'

export default class GameState {
  @observable tiles: Array<Tile> = []
  @observable isRunning: boolean = false
  @observable level: number = 0
  @observable score: number = 0

  @action
  buildBoard = () => {
    this.tiles = []
    times(this.level, (n) => {
      const id = n
      const { x, y } = boardUtils.getRandomTilePosition(this.tiles)
      const number = random(-100, 100)
      const color = boardUtils.getRandomTileColor()
      const isVisible = true
      this.tiles.push({ id, x, y, number, color, isVisible })
    })
  }

  @action
  startGame = () => {
    this.level = 4
    this.buildBoard()
  }

  @action
  handleTilePress = (tileId: string) => {
    const pressedTile = find(this.tiles, { id: tileId })
    const activeTiles = filter(this.tiles, 'isVisible')
    const sortedActiveTiles = orderBy(activeTiles, 'number')
    if (pressedTile.number === sortedActiveTiles[0].number) {
      pressedTile.isVisible = false
    } else {
      this.startGame()
    }
  }

  @computed
  get board (): Array<Tile> {
    return this.tiles.slice()
  }
}
