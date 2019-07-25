import { createReducer } from 'redux-act'

import { updateLanguagesList, chooseLanguage } from '../actions'

const initialState = {
  languagesList: [],
  language: {}
}

export default createReducer(
  {
    [updateLanguagesList]: (state, payload) => ({
      ...state,
      languagesList: payload,
    }),
    [chooseLanguage]: (state, payload) => ({
      ...state,
      language: payload,
    }),
  },
  initialState
)