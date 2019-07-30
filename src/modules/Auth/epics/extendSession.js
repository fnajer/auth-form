import axios from 'axios'
import { store } from 'redux/store'
import { API_BASE } from 'shared/constants'

import { updateAuthInfo } from 'modules/Auth/actions'
import { localLoadAuth } from 'shared/helpers/localStorage'
import { prepareSessionResponse } from './loadAuth'

export function extendSession() {
  const secret = localLoadAuth('secret')
  const id = localLoadAuth('id')

  if (!secret || !id) {
    updateAuth(null)
    return Promise.resolve(null)
  }

  return secret 
    ? fetchExtendSession(id, secret) 
    : Promise.resolve(null)
}

function fetchExtendSession(id, secret) {
  return axios({
    url: `${API_BASE}/my-session/${id}/refresh`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      secret
    },
  }).catch(error => {
    console.log(error);

    updateAuth(null)

    return Promise.resolve(null)
  })
}

export const tryRefreshSession = () => {
  return new Promise(resolve => {
    const secret = localLoadAuth('secret')
    const id = localLoadAuth('id')

    if (!secret || !id) {
      updateAuth(null)
      console.log('Нет данных об авторизации')
      return resolve(null)
    }

    fetchExtendSession(id, secret)
      .then(response => {
        if (response) {
          updateAuth(response)
        }
        
        resolve(response) // result: authResponse or null
      })
  })
}

function updateAuth(response) {
  const data = prepareSessionResponse(response)
  store.dispatch(updateAuthInfo(data))
}
