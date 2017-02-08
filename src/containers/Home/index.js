/* @flow */
import React, { Component } from 'react';
import { LayoutAnimation } from 'react-native';
import { Image, View } from 'react-native-animatable';
import { inject, observer } from 'mobx-react/native';
import Tile from 'src/components/Tile';
import LogoImage from 'src/images/logo.png';
import boardUtils from 'src/utils/boardUtils';
import styles from './index.style';

type DefaultProps = {
  navigateToPlayground: () => any,
  navigateToEndgame: () => any,
};

type Props = {
  navigateToPlayground: () => any,
  navigateToEndgame: () => any,
};

type State = {
  tileNumber: number,
  tileColor: string,
  hasHeaderAppeared: boolean,
};

@inject(allStores => ({
  navigateToPlayground: allStores.router.navigateToPlayground,
  navigateToEndgame: allStores.router.navigateToEndgame,
}))
@observer
export default class App extends Component<DefaultProps, Props, State> {
  static defaultProps = {
    navigateToPlayground: () => null,
    navigateToEndgame: () => null,
  };

  _headerRef: any;
  _bodyRef: any;

  state = {
    tileNumber: 3,
    tileColor: boardUtils.getRandomTileColor(),
    hasHeaderAppeared: false,
  };

  componentDidMount() {
    if (this._headerRef) {
      this._headerRef.bounceInRight(1000).then(() => {
        LayoutAnimation.spring();
        this.setState({ hasHeaderAppeared: true });
      });
    }
  }

  _handleTilePress = () => {
    LayoutAnimation.spring();
    this.setState({
      tileNumber: this.state.tileNumber + 1,
      tileColor: boardUtils.getRandomTileColor(),
    });
  };

  render() {
    const { tileNumber, tileColor, hasHeaderAppeared } = this.state;
    return (
      <View style={styles.container}>
        <View
          style={styles.header}
          ref={ref => {
            this._headerRef = ref;
          }}
        >
          <View style={styles.headerLeft}>
            <Tile
              backgroundColor={tileColor}
              text={tileNumber}
              onRelease={this._handleTilePress}
              style={styles.tile}
              textStyle={styles.tileText}
            />
          </View>
          <View style={styles.headerRight}>
            <Image resizeMode={'contain'} source={LogoImage} style={styles.logo} />
          </View>
        </View>
        {hasHeaderAppeared &&
          <View style={styles.body}>
            <Tile
              backgroundColor={tileColor}
              text={'Start Game'}
              style={styles.button}
              textStyle={styles.buttonText}
              onRelease={this.props.navigateToEndgame}
            />
          </View>}
      </View>
    );
  }
}
