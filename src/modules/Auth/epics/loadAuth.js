import { ofType } from 'redux-observable'
import { map, catchError } from 'rxjs/operators'

import {
  updateAuthInfo,
  loadAuthInfo,
} from 'modules/Auth/actions'

import { localLoadAuth } from 'shared/helpers/localStorage'
import { saveToLocaleStorage } from './saveAuth'

export function prepareSessionResponse(response) {
  let data
  if (response)
    data = {
      token: response.headers['x-access-token'],
      expires: response.data['expires'],
      secret: response.data['secret'],
      id: response.data['id'],
    }
  else 
    data = {
      token: '',
      expires: '',
      secret: '',
      id: ''
    } 
  saveToLocaleStorage(data)

  return data
}

export function loadFromLocalStorage() {
  return {
    token: localLoadAuth('token'),
    expires: localLoadAuth('expires'),
    secret: localLoadAuth('secret'),
    id: localLoadAuth('id'),
  }
}

const loadAuthInfoEpic = action$ =>
  action$.pipe(
    ofType(loadAuthInfo),
    map(action => {
      const data = loadFromLocalStorage()
      
      return updateAuthInfo(data)
    }),
    catchError(error => {
      console.log(error)
    })
    
  )

export default loadAuthInfoEpic
