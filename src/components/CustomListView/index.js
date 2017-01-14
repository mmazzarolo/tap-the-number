/* @flow */
/* eslint-disable react/prop-types */
import React, { Component, Element } from 'react'
import { ListView, RefreshControl, ScrollView, View } from 'react-native'

import colors from 'src/config/colors'

import styles from './index.style'

type Props = {
  items: Array<*>,
  renderRow: (rowData: any, sectionID: string | number, rowID: string | number, highlightRow?: boolean) => Element<*>,
  emptyView: Element<*>,
  showSeparator: boolean,
  showRefreshControl: boolean,
  onRefresh: () => void,
  isRefreshing: boolean
}

export default class CustomListView extends Component<void, Props, void> {
  dataSource: any

  componentWillMount () {
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
  }

  _renderSeparator = (sectionID, rowID) => {
    return (<View key={`${sectionID}-${rowID}`} style={styles.separator} />)
  }

  _renderRefreshControl = () => {
    return (
      <RefreshControl
        refreshing={this.props.isRefreshing}
        onRefresh={this.props.onRefresh}
        colors={[colors.PRIMARY, colors.PRIMARY_DARK]}
      />
    )
  }


  render () {
    const { items, renderRow, showSeparator, showRefreshControl,
      emptyView, isRefreshing, ...otherProps } = this.props

    const dataSource = this.dataSource.cloneWithRows(items)

    if (items.length > 0 || isRefreshing) {
      return (
        <ListView
          enableEmptySections={true}
          dataSource={dataSource}
          renderRow={renderRow}
          renderSeparator={showSeparator ? this._renderSeparator : null}
          refreshControl={showRefreshControl ? this._renderRefreshControl() : null}
          automaticallyAdjustContentInsets={false}
          showsVerticalScrollIndicator={false}
          {...otherProps}
        />
      )
    } else {
      return (
        <ScrollView
          refreshControl={showRefreshControl ? this._renderRefreshControl() : null}
          contentContainerStyle={styles.emptyViewContainer}
          {...otherProps}
        >
          {emptyView}
        </ScrollView>
      )
    }
  }
}
