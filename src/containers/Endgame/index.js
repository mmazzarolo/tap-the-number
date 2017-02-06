/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native-animatable';
import { inject, observer } from 'mobx-react/native';
import metrics from 'src/config/metrics';
import Tile from 'src/components/Tile';
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
  score: allStores.game.score,
}))
@observer
export default class Endgame extends Component<DefaultProps, Props, void> {
  static defaultProps = {
    navigateToPlayground: () => null,
    score: 0,
  };

  _containerRef: any;
  _contentRef: any;

  _handleRestartPress = async () => {
    await this._contentRef.bounceOutDown();
    await this._containerRef.zoomOut();
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
      backgroundColor: '#57B7CE',
      borderRadius: size / 2,
    };
    return (
      <View
        ref={ref => {
          this._containerRef = ref;
        }}
        style={containerStyle}
        pointerEvents={'box-none'}
        animation={'zoomIn'}
      >
        <View style={styles.container}>
          <View
            ref={ref => {
              this._contentRef = ref;
            }}
            style={styles.content}
            animation={'bounceInUp'}
            delay={500}
          >
            <View />
            <Tile
              width={metrics.DEVICE_WIDTH / 2}
              height={50}
              depth={metrics.TILE_SHADOW_DEPTH}
              backgroundColor={'#4C5154'}
              borderRadius={metrics.TILE_SIZE * 0.1}
              text={'RESTART'}
              onRelease={() => this._handleRestartPress()}
              style={styles.button}
              textStyle={styles.buttonText}
            />
          </View>
        </View>
      </View>
    );
  }
}
