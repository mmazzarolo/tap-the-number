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
};

type State = {
  isAnimatingFailure: boolean,
};

@observer
export default class BoardTile extends Component<void, Props, State> {
  state = {
    isTouched: false,
    isAnimatingFailure: false,
  };

  _tileRef = null;

  _handleRelease = () => {
    this.props.onTilePress();
  };

  animateFailure = async () => {
    this.setState({ isAnimatingFailure: true });
    if (this._tileRef) {
      await this._tileRef.getContainerRef().swing(400);
    }
    if (this._tileRef) {
      await this._tileRef.getContainerRef().bounceOut(450);
    }
    this.setState({ isAnimatingFailure: false });
  };

  render() {
    const { left, bottom, backgroundColor, text } = this.props;
    const { isAnimatingFailure } = this.state;
    const containerStyle = {
      position: 'absolute',
      left,
      bottom,
    };
    const tileSize = {
      width: metrics.TILE_SIZE,
      height: metrics.TILE_SIZE,
    };
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
          onRelease={isAnimatingFailure ? noop : this._handleRelease}
        />
      </View>
    );
  }
}
