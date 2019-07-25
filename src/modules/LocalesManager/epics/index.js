import { combineEpics } from 'redux-observable'

import modelsEpic from './models'
import addModelEpic from './addModel'
import saveModelEpic from './saveModel'
import translationsEpic from './translations'

export default combineEpics(
  modelsEpic,
  addModelEpic,
  saveModelEpic,
  translationsEpic,
)
