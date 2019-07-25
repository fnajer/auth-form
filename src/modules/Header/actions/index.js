import { createAction } from 'redux-act'

export const loadLanguagesList = createAction('Load languages list')
export const updateLanguagesList = createAction('Update languages list')

export const chooseLanguage = createAction('Choose language')