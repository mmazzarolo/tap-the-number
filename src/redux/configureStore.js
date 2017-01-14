/* @flow */
import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import env from 'src/config/env'

import reducers from 'src/redux/reducers'

export default (initialState: ?Object = {}) => {
  const middlewares = []

  // Create the logger
  if (env.IS_ENV_DEVELOPMENT) {
    const logger = createLogger({
      collapsed: true,
      duration: true
    })
    middlewares.push(logger)
  }

  // Create and export the store
  const createStoreWithMiddleware = applyMiddleware(...middlewares)
  const finalCreateStore = createStoreWithMiddleware(createStore)
  const store = finalCreateStore(reducers, initialState)

  return store
}
