import { combineEpics } from 'redux-observable'

import languagesListEpic from './languagesList'

export default combineEpics(
  languagesListEpic,
)
