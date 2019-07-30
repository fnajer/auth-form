import { ofType } from 'redux-observable'
import { map, switchMap, catchError } from 'rxjs/operators'
import axios from 'axios'
import { API_BASE } from 'shared/constants'

import {
  updateModelsList,
  loadModelsList,
} from '../actions'
import { localLoadAuth } from 'shared/helpers/localStorage'
import manageErrors from 'shared/helpers/errorsManager'

  
export function fetchModels({ code }) {
  const token = localLoadAuth('token')
  return axios({
    url: `${API_BASE}/translations`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept-Language': `${code}`,
    },
  }).catch(manageErrors({
    retry: fetchModels,
    params: {
      code
    },
    defaultValue: []
  }))
}

export function prepareModelsResponse(response) {
  return response ? response.data : []
}

const loadModelsListEpic = action$ =>
  action$.pipe(
    ofType(loadModelsList),
    switchMap(
      action => fetchModels({ code: action.payload.code }),
      (action, response) => [response, action]
    ),
    map(([response, action]) => {
      const modelsData = prepareModelsResponse(response)
      return updateModelsList(modelsData)
    }),
    catchError(error => {
      console.log(error)
    })
    
  )

export default loadModelsListEpic
