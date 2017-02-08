/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native-animatable';
import { Animated, Easing } from 'react-native';
import styles from './index.style';
import metrics from 'src/config/metrics';
import timings from 'src/config/timings';

type State = {
  animateValue: any,
};

export default class TimeBar extends Component<void, Props, State> {
  state = {
    animateValue: new Animated.Value(timings.TIME_LIMIT_MS),
  };

  componentDidMount() {
    Animated.timing(this.state.animateValue, {
      duration: timings.TIME_LIMIT_MS,
      easing: Easing.linear,
      toValue: 0,
    }).start();
  }

  render() {
    const backgroundColor = this.state.animateValue.interpolate({
      inputRange: [0, timings.TIME_LIMIT_MS * 0.4, timings.TIME_LIMIT_MS],
      outputRange: ['rgba(255,0,0, 1)', 'rgba(0,0,0, 0.3)', 'rgba(0,0,0, 0.3)'],
    });
    const width = this.state.animateValue.interpolate({
      inputRange: [0, timings.TIME_LIMIT_MS],
      outputRange: [0, metrics.DEVICE_WIDTH],
    });
    return (
      <View style={styles.container}>
        <View style={[styles.content, { width, backgroundColor }]} />
      </View>
    );
  }
}
