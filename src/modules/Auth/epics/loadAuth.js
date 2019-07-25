import { ofType } from 'redux-observable'
import { map, switchMap, catchError } from 'rxjs/operators'

import {
  updateAuthInfo,
  loadAuthInfo,
} from 'modules/Auth/actions'

import { saveToLocaleStorage } from './saveAuth'
import { extendSession } from './extendSession'

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

const loadAuthInfoEpic = action$ =>
  action$.pipe(
    ofType(loadAuthInfo),
    switchMap(
      action => extendSession(),
      (action, response) => [response, action]
    ),
    map(([response, action]) => {
      const data = prepareSessionResponse(response)
      
      return updateAuthInfo(data)
    }),
    catchError(error => {
      console.log(error)
    })
    
  )

export default loadAuthInfoEpic
