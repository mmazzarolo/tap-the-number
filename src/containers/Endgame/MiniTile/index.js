/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native-animatable';
import CustomText from 'src/components/CustomText';
import colorUtils from 'src/utils/colorUtils';
import styles from './index.style';

type Props = {
  number: number,
  backgroundColor: string,
  delay: number,
};

export default class MiniTile extends Component<void, Props, void> {
  render() {
    const containerStyle = {
      backgroundColor: this.props.backgroundColor,
      shadowColor: colorUtils.getDifferentLuminance(this.props.backgroundColor, -0.2),
    };
    return (
      <View
        style={[styles.container, containerStyle]}
        animation={'bounceIn'}
        delay={this.props.delay}
      >
        <CustomText style={styles.text}>
          {this.props.number}
        </CustomText>
      </View>
    );
  }
}
