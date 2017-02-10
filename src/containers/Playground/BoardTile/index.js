/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native';
import Tile from 'src/components/Tile';
import { noop } from 'lodash';
import { observer } from 'mobx-react/native';
import metrics from 'src/config/metrics';

type Props = {
  left: number,
  bottom: number,
  backgroundColor: string,
  text: string | number,
  onTilePress: Function,
  isEnabled: boolean,
  isVisible: boolean,
};

type State = {
  isAnimatingFailure: boolean,
};

@observer
export default class BoardTile extends Component<void, Props, State> {
  state = {
    isVisible: this.props.isVisible,
    isTouched: false,
    isAnimatingFailure: false,
  };

  _tileRef = null;

  _handlePress = () => {
    this.props.onTilePress();
  };

  _handleRelease = () => {
    this._tileRef.getContainerRef().bounceOut(200).then(() => {
      this.setState({ isVisible: false });
    });
  };

  animateFailure = async () => {
    this.setState({ isAnimatingFailure: true });
    if (this._tileRef && this._tileRef.getContainerRef()) {
      await this._tileRef.getContainerRef().swing(400);
    }
    if (this._tileRef && this._tileRef.getContainerRef()) {
      await this._tileRef.getContainerRef().bounceOut(450);
    }
    this.setState({ isVisible: false, isAnimatingFailure: false });
  };

  render() {
    const { left, bottom, backgroundColor, text, isEnabled } = this.props;
    const { isAnimatingFailure, isVisible } = this.state;
    const containerStyle = {
      position: 'absolute',
      left,
      bottom,
    };
    const tileSize = {
      width: metrics.TILE_SIZE,
      height: metrics.TILE_SIZE,
    };
    if (!isVisible) return null;
    return (
      <View style={containerStyle}>
        <Tile
          animation={'bounceIn'}
          style={tileSize}
          ref={ref => {
            this._tileRef = ref;
          }}
          backgroundColor={backgroundColor}
          text={text}
          onPress={isAnimatingFailure ? noop : this._handlePress}
          onRelease={isAnimatingFailure ? noop : this._handleRelease}
          isEnabled={isEnabled}
        />
      </View>
    );
  }
}
