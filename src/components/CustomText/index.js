/* @flow */
import React, { Element } from 'react';
import { Text } from 'react-native-animatable';
import TouchableView from 'src/components/TouchableView';
import styles from './index.style';

type Props = {
  children?: string | Element<any>,
  onPress?: Function,
  withShadow?: boolean,
  style?: any,
};

const CustomText = (props: Props): Element<any> => {
  const { onPress, style, children, withShadow, ...otherProps } = props;
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
    <Text style={textStyle} {...otherProps}>
      {children}
    </Text>
  );
  return onPress ? <TouchableView onPress={onPress}>{text}</TouchableView> : text;
};

export default CustomText;
