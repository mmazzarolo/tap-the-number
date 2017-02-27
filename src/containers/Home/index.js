/* @flow */
/**
 * The Home screen.
 * It's a simple screen, but it might seem complex in some part only because of animations.
 */
import React, { Component } from 'react';
import { LayoutAnimation } from 'react-native';
import { Image, View } from 'react-native-animatable';
import { inject, observer } from 'mobx-react/native';
import Tile from 'src/components/Tile';
import LogoImage from 'src/images/logo.png';
import boardUtils from 'src/utils/boardUtils';
import audioService from 'src/services/audio';
import styles from './index.style';

type Props = {
  navigateToPlayground: () => any,
  navigateToEndgame: () => any,
};

type State = {
  tileNumber: number,
  tileColor: string,
  hasHeaderAppeared: boolean,
  hasPressedButton: boolean,
};

@inject(allStores => ({
  navigateToPlayground: allStores.router.navigateToPlayground,
  navigateToEndgame: allStores.router.navigateToEndgame,
}))
@observer
export default class App extends Component<Props, Props, State> {
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
    hasPressedButton: false,
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
    const { tileNumber, tileColor } = this.state;
    this.setState({
      tileNumber: tileNumber === 99 ? 1 : tileNumber + 1,
      tileColor: boardUtils.getRandomTileColor([tileColor]),
    });
  };

  _handleButtonPress = async () => {
    this.setState({ hasPressedButton: true }); // Prevents button presses while animating to the new screen
    if (this._headerRef && this._bodyRef) {
      await Promise.all([this._headerRef.fadeOutLeft(400), this._bodyRef.fadeOutRight(400)]);
    }
    this.props.navigateToPlayground();
  };

  render() {
    const { tileNumber, tileColor, hasHeaderAppeared, hasPressedButton } = this.state;
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
              onPressOut={this._handleTilePress}
              style={styles.tile}
              textStyle={styles.tileText}
              singlePressOnly={false}
            />
          </View>
          <View style={styles.headerRight}>
            <Image resizeMode={'contain'} source={LogoImage} style={styles.logo} />
          </View>
        </View>
        {hasHeaderAppeared &&
          <View
            style={styles.body}
            ref={ref => {
              this._bodyRef = ref;
            }}
          >
            <Tile
              backgroundColor={tileColor}
              text={'Start Game'}
              style={styles.button}
              textStyle={styles.buttonText}
              onPressOut={this._handleButtonPress}
              isEnabled={!hasPressedButton}
              playSound={audioService.playButtonSound}
            />
          </View>}
      </View>
    );
  }
}
