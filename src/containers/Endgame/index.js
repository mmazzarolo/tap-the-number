/* @flow */
/**
 * The ending score screen.
 * It's a simple screen, but it might seem complex in some part only because of animations.
 */
import React, { Component } from 'react';
import { View } from 'react-native-animatable';
import { inject, observer } from 'mobx-react/native';
import metrics from 'src/config/metrics';
import Tile from 'src/components/Tile';
import CustomText from 'src/components/CustomText';
import boardUtils from 'src/utils/boardUtils';
import audioService from 'src/services/audio';
import styles from './index.style';

type Props = {
  navigateToPlayground: () => any,
  score: number,
};

type State = {
  buttonColor: string,
  hasPressedButton: boolean,
};

@inject(allStores => ({
  navigateToPlayground: allStores.router.navigateToPlayground,
  pressedTiles: allStores.game.pressedTiles,
  score: allStores.game.score,
}))
@observer
export default class Endgame extends Component<Props, Props, State> {
  static defaultProps = {
    pressedTiles: [],
    navigateToPlayground: () => null,
    score: 0,
  };

  _containerRef: any;
  _contentRef: any;

  state = {
    buttonColor: boardUtils.getRandomTileColor(),
    hasPressedButton: false,
  };

  _handleRestartPress = async () => {
    this.setState({ hasPressedButton: true }); // Prevents button presses while animating to the new screen
    await this._contentRef.fadeOut(300);
    await this._containerRef.zoomOut();
    this.props.navigateToPlayground();
  };

  render() {
    const { buttonColor, hasPressedButton } = this.state;
    const size = metrics.DEVICE_HEIGHT * 1.3;
    // ContainerStyle handles the first 'expanding circle' animation
    const containerStyle = {
      position: 'absolute',
      bottom: metrics.DEVICE_HEIGHT / 2 - size / 2,
      left: metrics.DEVICE_WIDTH / 2 - size / 2,
      height: size,
      width: size,
      borderRadius: size / 2,
      justifyContent: 'center',
      alignItems: 'center',
    };
    return (
      <View
        ref={ref => {
          this._containerRef = ref;
        }}
        style={[styles.container, containerStyle]}
        pointerEvents={'box-none'}
        animation={'zoomIn'}
        duration={500}
      >
        <View
          ref={ref => {
            this._contentRef = ref;
          }}
          style={styles.content}
        >
          <View style={styles.header}>
            <CustomText
              style={styles.headerText}
              withShadow={true}
              animation={'bounceIn'}
              delay={500}
            >
              {'Your score:'}
            </CustomText>
            <CustomText
              style={styles.scoreText}
              withShadow={true}
              animation={'bounceIn'}
              delay={700}
            >
              {this.props.score}
            </CustomText>
          </View>
          <View style={styles.body}>
            <Tile
              animation={'bounceIn'}
              delay={900}
              depth={metrics.TILE_SHADOW_DEPTH}
              backgroundColor={buttonColor}
              text={'RESTART'}
              onPressOut={() => this._handleRestartPress()}
              style={styles.button}
              textStyle={styles.buttonText}
              isEnabled={!hasPressedButton}
              playSound={audioService.playButtonSound}
            />
          </View>
        </View>
      </View>
    );
  }
}
