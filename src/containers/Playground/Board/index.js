/* @flow */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { View } from 'react-native-animatable'
import type { Tile } from 'src/types'
import { observer } from 'mobx-react/native'
import BoardTile from 'src/containers/Playground/BoardTile'

import styles from './index.style'

type Props = {
  tiles: Array<Tile>,
  onTilePress: (tileId: number) => any
}

@observer
export default class TilesCarousel extends Component<void, Props, void> {
  _tileRefs = []

  animateFailure = () => {
    this._tileRefs.forEach((ref) => {
      if (ref) {
        ref.animateFailure()
      }
    })
  }

  render () {
    this._tileRefs = []
    return (
      <View style={styles.container}>
        {this.props.tiles.map((tile, index) => (
          <BoardTile
            ref={(ref) => this._tileRefs[index] = ref}
            key={`board_tile_${tile.id}`}
            left={tile.x}
            bottom={tile.y}
            backgroundColor={tile.color}
            text={tile.number}
            onTilePress={() => this.props.onTilePress(tile.id)}
            isVisible={tile.isVisible}
          />
        ))}
      </View>
    )
  }
}
