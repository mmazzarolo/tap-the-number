/* @flow */
/**
 * The time left bar at the top of the Playground screen.
 */
import React, { Component } from 'react';
import { View } from 'react-native-animatable';
import { Animated, Easing } from 'react-native';
import styles from './index.style';
import metrics from 'src/config/metrics';
import timings from 'src/config/timings';

type State = {
  animateValue: any,
};

export default class TimeBar extends Component<void, {}, State> {
  state = {
    animateValue: new Animated.Value(timings.TIME_LIMIT_MS),
  };

  componentDidMount() {
    Animated.timing(this.state.animateValue, {
      duration: timings.TIME_LIMIT_MS,
      easing: Easing.linear, // No easing
      toValue: 0,
    }).start();
  }

  render() {
    // Animate the TimeBar color from grey to red, starting when there are left only 12 seconds
    const backgroundColor = this.state.animateValue.interpolate({
      inputRange: [0, timings.TIME_LIMIT_MS * 0.4, timings.TIME_LIMIT_MS],
      outputRange: ['rgba(255,0,0, 1)', 'rgba(0,0,0, 0.3)', 'rgba(0,0,0, 0.3)'],
    });
    // Animate the TimeBar width from DEVICE_WIDTH to 0 in TIME_LIMIT_MS (which currently is 30 seconds)
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
