/* @flow */
/** 
 * A simple cross platform component that handles the default touchable feedback.
 */
import React, { Element } from 'react';
import { View, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import env from 'src/config/env';

type Props = {
  isRippleDisabled?: boolean,
  rippleColor?: string,
  children?: ?Element<any>,
  style?: any,
};

const TouchableView = (props: Props): Element<any> => {
  const { isRippleDisabled, rippleColor, children, style, ...otherProps } = props;
  if (env.IS_MATERIAL_DESIGN_SUPPORTED && !isRippleDisabled) {
    const background = TouchableNativeFeedback.Ripple(rippleColor, false);
    return (
      <TouchableNativeFeedback {...otherProps} background={background}>
        <View style={style}>{children}</View>
      </TouchableNativeFeedback>
    );
  } else {
    return (
      <TouchableOpacity {...otherProps} style={style}>
        {children}
      </TouchableOpacity>
    );
  }
};

export default TouchableView;
