import { combineEpics } from 'redux-observable'

import authEpic from 'modules/Auth/epics'
import localesEpic from 'modules/Header/epics'
import modelsEpic from 'modules/LocalesManager/epics'
import initialInfoEpic from 'modules/App/epics'

const rootEpic = combineEpics(
  initialInfoEpic,
  authEpic,
  localesEpic,
  modelsEpic
)

export default rootEpic
