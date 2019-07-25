import { ofType } from 'redux-observable'
import { map, switchMap, catchError } from 'rxjs/operators'
import axios from 'axios'
import { localLoadAuth } from 'shared/helpers/localStorage'
import manageErrors from 'shared/helpers/errorsManager'

import { API_BASE } from 'shared/constants'
import { saveTranslation, updateTranslation } from '../actions'

export function updateNative({ code, id, native }) {
  const token = localLoadAuth('token')
  return axios({
    url: `${API_BASE}/translation/${id}/native`,
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Language': `${code}`,
    },
    data: {
      native,
    }
  }).catch(manageErrors({
    retry: updateNative,
    params: {
      code,
      native,
      id
    }
  }))
}

const saveTranslationEpic = action$ =>
  action$.pipe(
    ofType(saveTranslation),
    switchMap(
      ({ payload }) => updateNative({
        code: payload.code,
        id: payload.id,
        native: payload.native
      }),
      (action, response) => [response, action]
    ),
    map(([response, action]) => {
      return updateTranslation(response.data)
    }),
    catchError(error => {
      console.log(error)
    })
    
  )

export default saveTranslationEpic
