/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native-animatable';
import { inject, observer } from 'mobx-react/native';

import Playground from 'src/containers/Playground';
import Home from 'src/containers/Home';
import Endgame from 'src/containers/Endgame';

type DefaultProps = {
  currentScreen: string,
};

type Props = {
  currentScreen: string,
};

@inject(allStores => ({
  currentScreen: allStores.router.currentScreen,
}))
@observer
export default class App extends Component<DefaultProps, Props, void> {
  static defaultProps = {
    currentScreen: 'HOME',
  };

  render() {
    switch (this.props.currentScreen) {
      case 'HOME':
        return <Home />;
      case 'PLAYGROUND':
        return <Playground />;
      case 'ENDGAME':
        return <Endgame />;
      default:
        return <View />;
    }
  }
}
