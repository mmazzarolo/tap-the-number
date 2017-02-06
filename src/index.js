/* @flow */
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'mobx-react/native';

import App from 'src/containers/App';
import GameStore from 'src/stores/game';
import RouterStore from 'src/stores/router';

const gameStore = new GameStore();
const routerStore = new RouterStore();

export class Numberz extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Provider game={gameStore} router={routerStore}>
          <App />
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Numberz;
