import { ofType } from 'redux-observable'
import { map } from 'rxjs/operators'

import {
  saveAuthInfo,
  updateAuthInfo
} from 'modules/Auth/actions'

import { localSaveAuth } from 'shared/helpers/localStorage'

export function saveToLocaleStorage(data) {
  localSaveAuth('token', data.token)
  localSaveAuth('expires', data.expires)
  localSaveAuth('secret', data.secret)
  localSaveAuth('id', data.id)
}

const saveAuthInfoEpic = action$ =>
  action$.pipe(
    ofType(saveAuthInfo),
    map(action => {
      const payload = action.payload

      const data = {
        token: payload.headers['x-access-token'],
        expires: payload.data['expires'],
        secret: payload.data['secret'],
        id: payload.data['id']
      }
      saveToLocaleStorage(data)
      return updateAuthInfo(data)
    })
  )

export default saveAuthInfoEpic
