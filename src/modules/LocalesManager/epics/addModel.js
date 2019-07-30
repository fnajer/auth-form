import { ofType } from 'redux-observable'
import { map, switchMap, catchError } from 'rxjs/operators'
import axios from 'axios'
import { API_BASE } from 'shared/constants'
import { localLoadAuth } from 'shared/helpers/localStorage'
import manageErrors from 'shared/helpers/errorsManager'

import {
  addModelToList,
  addModel,
} from '../actions'

export function createModel(code, data) {
  const token = localLoadAuth('token')
  return axios({
    url: `${API_BASE}/translation`,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept-Language': `${code}`,
    },
    data
  }).catch(manageErrors({
    retry: createModel,
    params: {
      code,
      data
    }
  }))
}

const addModelEpic = action$ =>
  action$.pipe(
    ofType(addModel),
    switchMap(
      ({ payload }) => createModel(
        payload.code,
        payload.data
      ),
      (action, response) => [response, action]
    ),
    map(([response, action]) => {
      return addModelToList(response.data)
    }),
    catchError(error => {
      console.log(error)
    })
    
  )

export default addModelEpic
