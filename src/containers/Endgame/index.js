/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native-animatable';
import { inject, observer } from 'mobx-react/native';
import metrics from 'src/config/metrics';
import Tile from 'src/components/Tile';
import CustomText from 'src/components/CustomText';
import boardUtils from 'src/utils/boardUtils';
import styles from './index.style';

type DefaultProps = {
  navigateToPlayground: () => any,
  score: number,
};

type Props = {
  navigateToPlayground: () => any,
  score: number,
};

@inject(allStores => ({
  navigateToPlayground: allStores.router.navigateToPlayground,
  pressedTiles: allStores.game.pressedTiles,
  score: allStores.game.score,
}))
@observer
export default class Endgame extends Component<DefaultProps, Props, void> {
  static defaultProps = {
    pressedTiles: [],
    navigateToPlayground: () => null,
    score: 0,
  };

  _containerRef: any;
  _contentRef: any;

  _handleRestartPress = async () => {
    await this._contentRef.bounceOut();
    await this._containerRef.fadeOut(300);
    this.props.navigateToPlayground();
  };

  render() {
    const size = metrics.DEVICE_HEIGHT * 1.3;
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
          <Tile
            animation={'bounceIn'}
            delay={900}
            depth={metrics.TILE_SHADOW_DEPTH}
            backgroundColor={boardUtils.getRandomTileColor()}
            text={'RESTART'}
            onRelease={() => this._handleRestartPress()}
            style={styles.button}
            textStyle={styles.buttonText}
          />
        </View>
      </View>
    );
  }
}
