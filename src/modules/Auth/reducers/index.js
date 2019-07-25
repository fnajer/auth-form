import { createReducer } from 'redux-act'

import { updateAuthInfo } from '../actions'

const initialState = {
  token: '',
  expires: '',
  secret: '',
  id: '',
}

export default createReducer(
  {
    [updateAuthInfo]: (state, payload) => ({
      ...state,
      ...payload,
    }),
  },
  initialState
)