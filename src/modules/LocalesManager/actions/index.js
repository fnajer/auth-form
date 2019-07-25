import { createAction } from 'redux-act'

export const loadModelsList = createAction('Load models list')
export const updateModelsList = createAction('Update models list')

export const saveTranslation = createAction('Save translation')
export const updateTranslation = createAction('Update translation')

export const saveModel = createAction('Save model')
export const updateModelToList = createAction('Update model')

export const addModel = createAction('Add model')
export const addModelToList = createAction('Add model to model list')