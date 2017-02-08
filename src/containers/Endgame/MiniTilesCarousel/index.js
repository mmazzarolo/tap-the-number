/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native-animatable';
import CustomText from 'src/components/CustomText';
import colorUtils from 'src/utils/colorUtils';
import type { Tile } from 'src/types';
import { chunk } from 'lodash';
import MiniTile from '../MiniTile';
import styles from './index.style';

type Props = {
  tiles: Array<Tile>,
};

export default class MiniTilesCarousel extends Component<void, Props, void> {
  render() {
    const tilesChunks = chunk(this.props.tiles, 10);
    return (
      <View>
        {tilesChunks.map((tilesChunk, chunkIndex) => {
          return (
            <View style={styles.tilesRow} key={`tileRow_${chunkIndex}`}>
              {tilesChunk.map((tile, index) => {
                return (
                  <MiniTile
                    key={`miniTile_${index}`}
                    backgroundColor={tile.color}
                    number={tile.number}
                    delay={index * 100}
                  />
                );
              })}
            </View>
          );
        })}
      </View>
    );
  }
}
