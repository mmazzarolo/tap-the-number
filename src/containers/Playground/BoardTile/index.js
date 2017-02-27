/* @flow */
/**
 * A HOC on src/component/Tile that customizes it a bit for the board.  
 * It adds styles and animations when the Tile appears/disappears.
 */
import React, { Component } from 'react';
import { View } from 'react-native';
import Tile from 'src/components/Tile';
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
  isVisible: boolean,
};

@observer
export default class BoardTile extends Component<void, Props, State> {
  state = {
    isVisible: this.props.isVisible,
  };

  _tileRef = null;

  _handlePressOut = async () => {
    this.props.onTilePress();
    if (this._tileRef && this._tileRef.getContainerRef()) {
      await this._tileRef.getContainerRef().bounceOut(200);
    }
    this.setState({ isVisible: false });
  };

  animateFailure = async () => {
    if (this._tileRef && this._tileRef.getContainerRef()) {
      await this._tileRef.getContainerRef().swing(400);
    }
    if (this._tileRef && this._tileRef.getContainerRef()) {
      await this._tileRef.getContainerRef().bounceOut(450);
    }
    this.setState({ isVisible: false });
  };

  render() {
    const { left, bottom, backgroundColor, text, isEnabled } = this.props;
    const { isVisible } = this.state;
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
          style={tileSize}
          ref={ref => {
            this._tileRef = ref;
          }}
          animation={'bounceIn'}
          backgroundColor={backgroundColor}
          text={text}
          onPressOut={this._handlePressOut}
          isEnabled={isEnabled}
        />
      </View>
    );
  }
}
