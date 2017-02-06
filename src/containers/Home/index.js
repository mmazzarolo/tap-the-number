/* @flow */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { LayoutAnimation } from 'react-native'
import { Image, View } from 'react-native-animatable'
import { inject, observer } from 'mobx-react/native'
import metrics from 'src/config/metrics'
import Tile from 'src/components/Tile'
import Button from 'src/components/Button'
import LogoImage from 'src/images/logo.png'
import boardUtils from 'src/utils/boardUtils'
import styles from './index.style'

type Props = {
  navigateToEndgame: () => void
}

type State = {
  tileNumber: number,
  tileColor: string,
  hasHeaderAppeared: boolean
}

@inject((allStores) => ({
  navigateToPlayground: allStores.router.navigateToPlayground,
  navigateToEndgame: allStores.router.navigateToEndgame
}))
@observer
export default class App extends Component<void, Props, State> {
  _headerRef: any
  _bodyRef: any

  state = {
    tileNumber: 3,
    tileColor: boardUtils.getRandomTileColor(),
    hasHeaderAppeared: false
  }

  componentDidMount () {
    if (this._headerRef) {
      this._headerRef.fadeIn(2000).then(() => {
        LayoutAnimation.spring()
        this.setState({ hasHeaderAppeared: true })
      })
    }
  }

  _handleTilePress = () => {
    LayoutAnimation.spring()
    this.setState({
      tileNumber: this.state.tileNumber + 1,
      tileColor: boardUtils.getRandomTileColor()
    })
  }

  render () {
    const { tileNumber, tileColor, hasHeaderAppeared } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.header} ref={(ref) => { this._headerRef = ref }}>
          <View style={styles.headerLeft}>
            <Tile
              backgroundColor={tileColor}
              text={tileNumber}
              onRelease={this._handleTilePress}
              style={styles.tile}
              textStyle={styles.tileText}
            />
          </View>
          <View style={styles.headerRight}>
            <Image
              resizeMode={'contain'}
              source={LogoImage}
              style={styles.logo}
            />
          </View>
        </View>
        {(hasHeaderAppeared) &&
          <View style={styles.body}>
            <Tile
              backgroundColor={tileColor}
              text={'Start Game'}
              style={styles.button}
              textStyle={styles.buttonText}
              onRelease={this.props.navigateToPlayground}
            />
          </View>
        }
      </View>
    )
  }
}
