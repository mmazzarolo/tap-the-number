/* @flow */
import { observable } from 'mobx'

type Screen = 'HOME' | 'PLAYGROUND' | 'ENDGAME'

export default class RouterStore {
  @observable currentScreen: Screen = 'HOME'

  goToHome = () => {
    this.currentScreen = 'HOME'
  }

  goToPlayground = () => {
    this.currentScreen = 'PLAYGROUND'
  }

  goToEndgame = () => {
    this.currentScreen = 'ENDGAME'
  }
}
