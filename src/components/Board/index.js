/* @flow */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { View } from 'react-native-animatable'
import type { Tile } from 'src/types'
import { inject, observer } from 'mobx-react/native'
import BoardTile from 'src/components/BoardTile'

import styles from './index.style'

type Props = {
  tiles: Array<Tile>,
  onTilePress: (tileId: number) => any
}

@observer
export default class TilesCarousel extends Component<void, Props, void> {
  render () {
    return (
      <View style={styles.container}>
        {this.props.tiles.map((tile) => (
          <BoardTile
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
