/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native-animatable';
import { inject, observer } from 'mobx-react/native';
import metrics from 'src/config/metrics';
import Tile from 'src/components/Tile';
import CustomText from 'src/components/CustomText';
import styles from './index.style';
import { times } from 'lodash';
import colors from 'src/config/colors';
import colorUtils from 'src/utils/colorUtils';
import boardUtils from 'src/utils/boardUtils';
import MiniTilesCarousel from './MiniTilesCarousel';

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
      borderRadius: size / 2,
      justifyContent: 'center',
      alignItems: 'center',
    };
    const tiles = times(10, () => ({
      color: boardUtils.getRandomTileColor(),
      number: boardUtils.getRandomNumber(1, []),
    }));
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
          animation={'bounceInUp'}
          duration={500}
          delay={500}
        >
          <View style={styles.header}>
            <MiniTilesCarousel tiles={tiles} />
            <CustomText style={styles.headerText} withShadow={true}>
              {'Your score:'}
            </CustomText>
            <CustomText style={styles.score} withShadow={true}>
              {this.props.score}
            </CustomText>
          </View>
          <Tile
            depth={metrics.TILE_SHADOW_DEPTH}
            backgroundColor={'#4C5154'}
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
