import { combineReducers } from 'redux'

import auth from 'modules/Auth/reducers'
import locales from 'modules/Header/reducers'
import models from 'modules/LocalesManager/reducers'

export default combineReducers({
  auth,
  locales,
  models
})
