/* @flow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'

import configureStore from 'src/redux/configureStore'
import Playground from 'src/containers/Playground'

const store = configureStore()

export class Numberz extends Component {
  render () {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Playground />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default Numberz
