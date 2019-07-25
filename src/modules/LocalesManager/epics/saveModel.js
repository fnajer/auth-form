import { ofType } from 'redux-observable'
import { map, switchMap, catchError } from 'rxjs/operators'
import axios from 'axios'
import { API_BASE } from 'shared/constants'
import { localLoadAuth } from 'shared/helpers/localStorage'
import manageErrors from 'shared/helpers/errorsManager'

import {
  updateModelToList,
  saveModel,
} from '../actions'

export function updateModel({ code, id, data }) {
  const token = localLoadAuth('token')
  return axios({
    url: `${API_BASE}/translation/${id}`,
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Language': `${code}`,
    },
    data
  }).catch(manageErrors({
    retry: updateModel,
    params: {
      code,
      data,
      id
    }
  }))
}

const saveModelEpic = action$ =>
  action$.pipe(
    ofType(saveModel),
    switchMap(
      ({ payload }) => updateModel({
        code: payload.code,
        id: payload.id,
        data: payload.data
      }),
      (action, response) => [response, action]
    ),
    map(([response, action]) => {
      return updateModelToList(response.data)
    }),
    catchError(error => {
      console.log(error)
    })
    
  )

export default saveModelEpic
