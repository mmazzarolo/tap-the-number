/* @flow */
import React, { Component } from 'react';
import { Provider } from 'mobx-react/native';

import App from './containers/App';
import GameStore from './stores/game';
import RouterStore from './stores/router';

const gameStore = new GameStore();
const routerStore = new RouterStore();

export class TapTheNumber extends Component {
  render() {
    return (
      <Provider game={gameStore} router={routerStore}>
        <App />
      </Provider>
    );
  }
}

export default TapTheNumber;
