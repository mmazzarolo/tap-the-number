/* @flow */
/** 
 * React-Native `<Text />` component does not scale the text based on the device size.  
 * This component does, and it also provides a nice interface for using custom fonts and style.  
 */
import React, { Element } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-animatable';
import TouchableView from 'src/components/TouchableView';
import metrics from 'src/config/metrics';
import styles from './index.style';

type Props = {
  children?: string | Element<any>,
  onPress?: Function,
  withShadow?: boolean,
  style?: any,
};

const CustomText = (props: Props): Element<any> => {
  const { onPress, style, children, withShadow, ...otherProps } = props;
  const fontSize = StyleSheet.flatten(style).fontSize || 14;
  const scaledFontSize = Math.round(fontSize * metrics.DEVICE_WIDTH / 375);
  const shadowStyle = {
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowRadius: 0,
    textShadowOffset: {
      height: 4,
      width: 4,
    },
  };
  const textStyle = [styles.text, withShadow ? shadowStyle : {}, style];
  const text = (
    <Text style={[textStyle, { fontSize: scaledFontSize }]} {...otherProps}>
      {children}
    </Text>
  );
  return onPress ? <TouchableView onPress={onPress}>{text}</TouchableView> : text;
};

export default CustomText;
