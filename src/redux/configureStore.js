import { createStore, applyMiddleware, compose } from 'redux'

import { createEpicMiddleware } from 'redux-observable'
import rootEpic from './epics'

import rootReducer from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
  const epicMiddleware = createEpicMiddleware()
  let store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(epicMiddleware))
  )
  epicMiddleware.run(rootEpic)

  return { store }
}