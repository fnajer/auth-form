import { createReducer } from 'redux-act'

import { 
  updateModelsList, 
  updateTranslation, 
  addModelToList,
  updateModelToList
} from '../actions'

const initialState = {
  modelsList: [],
}

export default createReducer(
  {
    [updateModelsList]: (state, payload) => ({
      ...state,
      modelsList: payload,
    }),
    [updateTranslation]: (state, payload) => {
      const index = state.modelsList.findIndex(model => (
        model.id === payload.id
      ))
      let modelsList = [...state.modelsList]
      modelsList[index] = payload
      return {
        ...state,
        modelsList,
      }
    },
    [addModelToList]: (state, payload) => {
      let modelsList = [...state.modelsList]
      modelsList.unshift(payload)
      return {
        ...state,
        modelsList,
      }
    },
    [updateModelToList]: (state, payload) => {
      const index = state.modelsList.findIndex(model => (
        model.id === payload.id
      ))
      let modelsList = [...state.modelsList]
      modelsList[index] = payload
      return {
        ...state,
        modelsList,
      }
    },
  },
  initialState
)