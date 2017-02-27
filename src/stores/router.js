/* @flow */
/**
 * A super-simple MobX routing solution.
 */
import { observable } from 'mobx';

export type Screen = 'HOME' | 'PLAYGROUND' | 'ENDGAME';

export default class RouterStore {
  @observable currentScreen: Screen = 'HOME';

  navigateToHome = () => {
    this.currentScreen = 'HOME';
  };

  navigateToPlayground = () => {
    this.currentScreen = 'PLAYGROUND';
  };

  navigateToEndgame = () => {
    this.currentScreen = 'ENDGAME';
  };
}
