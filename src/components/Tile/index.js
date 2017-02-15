/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native-animatable';
import { observer } from 'mobx-react/native';
import { LayoutAnimation } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import CustomText from 'src/components/CustomText';
import colorUtils from 'src/utils/colorUtils';
import metrics from 'src/config/metrics';
import audioService from 'src/services/audio';
import styles from './index.style';

type Props = {
  depth: number,
  isEnabled?: boolean,
  backgroundColor: string,
  borderRadius: number,
  text: string | number,
  playSound: () => any,
  textStyle?: any,
  singlePressOnly?: boolean,
  onPressIn?: () => any,
  onPressOut?: () => any,
  style?: any,
};

type State = {
  isTouched: boolean,
  hasBeenPressed: boolean,
};

@observer
export default class BoardTile extends Component<Props, Props, State> {
  static defaultProps = {
    depth: metrics.TILE_SHADOW_DEPTH,
    borderRadius: metrics.TILE_BORDER_RADIUS,
    backgroundColor: 'red',
    text: '1',
    isEnabled: true,
    singlePressOnly: true,
    playSound: audioService.playSuccessSound,
  };

  state = {
    isTouched: false,
    hasBeenPressed: false,
  };

  _containerRef = null;

  getContainerRef = () => this._containerRef;

  _handlePressIn = () => {
    const { isEnabled, singlePressOnly, onPressIn, playSound } = this.props;
    if (!isEnabled) return;
    if (singlePressOnly && this.state.hasBeenPressed) return;
    playSound();
    LayoutAnimation.spring();
    this.setState({ isTouched: true });
    if (onPressIn) {
      onPressIn();
    }
    return true;
  };

  _handlePressOut = () => {
    const { isEnabled, singlePressOnly, onPressOut } = this.props;
    if (!isEnabled) return;
    if (singlePressOnly && this.state.hasBeenPressed) return;
    if (onPressOut) {
      onPressOut();
    }
    this.setState({ isTouched: false, hasBeenPressed: true });
  };

  render() {
    const {
      depth,
      borderRadius,
      backgroundColor,
      text,
      textStyle,
      style,
      ...otherProps
    } = this.props;
    const { isTouched } = this.state;
    const halfDepth = depth / 2;
    const tileStyle = {
      marginTop: isTouched ? depth : halfDepth,
      backgroundColor,
      borderRadius,
    };
    const depthStyle = {
      marginTop: -borderRadius,
      height: isTouched ? halfDepth + borderRadius : depth + borderRadius,
      backgroundColor: colorUtils.getDifferentLuminance(backgroundColor, -0.2),
      borderBottomLeftRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
    };
    return (
      <TouchableWithoutFeedback
        onPressIn={this._handlePressIn}
        onPressOut={this._handlePressOut}
        delayPressIn={0}
      >
        <View
          ref={ref => {
            this._containerRef = ref;
          }}
          {...otherProps}
        >
          <View style={[styles.tile, tileStyle, style]}>
            <CustomText style={[styles.text, textStyle]} withShadow={true}>
              {text}
            </CustomText>
          </View>
          <View style={[styles.depth, depthStyle]} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
