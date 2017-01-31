/* @flow */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { View } from 'react-native-animatable'
import { inject, observer } from 'mobx-react/native'

import Playground from 'src/containers/Playground'
import Home from 'src/containers/Home'
import Endgame from 'src/containers/Endgame'
import styles from './index.style'

type Props = {
  currentScreen: string,
}

@inject((allStores) => ({
  currentScreen: allStores.router.currentScreen
}))
@observer
export default class App extends Component<void, Props, void> {
  render () {
    switch (this.props.currentScreen) {
      case 'HOME': return <Home />
      case 'PLAYGROUND': return <Playground />
      case 'ENDGAME': return <Endgame />
      default: return <View />
    }
  }
}
