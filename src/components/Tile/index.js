/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native-animatable';
import { observer } from 'mobx-react/native';
import CustomText from 'src/components/CustomText';
import colorUtils from 'src/utils/colorUtils';
import metrics from 'src/config/metrics';
import audioService from 'src/services/audio';
import styles from './index.style';

type DefaultProps = {
  depth: number,
  borderRadius: number,
  isEnabled: boolean,
};

type Props = {
  depth: number,
  isEnabled?: boolean,
  backgroundColor: string,
  borderRadius: number,
  text: string | number,
  textStyle?: any,
  onPress?: () => any,
  onRelease?: () => any,
  delay?: number,
  style?: any,
};

type State = {
  isTouched: boolean,
};

@observer
export default class BoardTile extends Component<DefaultProps, Props, State> {
  static defaultProps = {
    depth: metrics.TILE_SHADOW_DEPTH,
    borderRadius: metrics.TILE_BORDER_RADIUS,
    isEnabled: true,
    delay: 0,
  };

  state = {
    isTouched: false,
  };

  _containerRef = null;

  getContainerRef = () => this._containerRef;

  _handlePress = () => {
    if (!this.props.isEnabled) return;
    audioService.playSuccessSound();
    this.setState({ isTouched: true });
    if (this.props.onPress) {
      this.props.onPress();
    }
    return true;
  };

  _handleRelease = () => {
    if (this.props.onRelease) {
      this.props.onRelease();
    }
    this.setState({ isTouched: false });
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
      <View
        ref={ref => {
          this._containerRef = ref;
        }}
        onStartShouldSetResponder={this._handlePress}
        onResponderRelease={this._handleRelease}
        {...otherProps}
      >
        <View style={[styles.tile, tileStyle, style]}>
          <CustomText style={[styles.text, textStyle]} withShadow={true}>
            {text}
          </CustomText>
        </View>
        <View style={[styles.depth, depthStyle]} />
      </View>
    );
  }
}
