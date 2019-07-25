import { createAction } from 'redux-act'

export const loadAuthInfo = createAction('Load user info')
export const saveAuthInfo = createAction('Save user info')
export const updateAuthInfo = createAction('Update user info')