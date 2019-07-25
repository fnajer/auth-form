import { combineEpics } from 'redux-observable'

import loadAuthInfoEpic from './loadAuth'
import saveAuthInfoEpic from './saveAuth'

export default combineEpics(
  loadAuthInfoEpic,
  saveAuthInfoEpic,
)
