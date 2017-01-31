/* @flow */
/* eslint-disable react/prop-types */
import React, { Component, Element } from 'react'
import { View } from 'react-native-animatable'
import { observer } from 'mobx-react/native'
import metrics from 'src/config/metrics'

type Props = {
  isVisible: boolean,
  backgroundColor: string,
  animationTiming?: boolean,
  children?: Element<any>
}

@observer
export default class CircleAnimation extends Component<void, Props, void> {
  _viewRef: any = null

  componentDidUpdate (prevProps: Props) {
    const previouslyVisible = prevProps.isVisible
    const currentlyVisible = this.props.isVisible
    if (!previouslyVisible && currentlyVisible) {
      this._viewRef.animate('zoomIn', this.props.animationTiming)
    } else if (previouslyVisible && !currentlyVisible) {
      this._viewRef.animate('zoomOut', this.props.animationTiming)
    }
  }

  render () {
    const size = metrics.DEVICE_HEIGHT * 1.3
    const style = {
      position: 'absolute',
      bottom: (metrics.DEVICE_HEIGHT / 2) - (size / 2),
      left: (metrics.DEVICE_WIDTH / 2) - (size / 2),
      height: size,
      width: size,
      backgroundColor: this.props.backgroundColor,
      borderRadius: size / 2
    }
    return (
      <View
        ref={(ref) => { this._viewRef = ref }}
        style={style}
        pointerEvents={'box-none'}
      />
    )
  }
}
