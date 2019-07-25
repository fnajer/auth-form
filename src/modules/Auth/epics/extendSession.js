import axios from 'axios'
import { store } from 'redux/store'
import { API_BASE } from 'shared/constants'

import { updateAuthInfo } from 'modules/Auth/actions'
import { localLoadAuth } from 'shared/helpers/localStorage'
import { prepareSessionResponse } from './loadAuth'

export function extendSession() {
  const secret = localLoadAuth('secret')
  const id = localLoadAuth('id')

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

    const data = prepareSessionResponse(null)
    store.dispatch(updateAuthInfo(data))

    return Promise.resolve(null)
  })
}

export const tryRefreshSession = () => {
  return new Promise(resolve => {
    const secret = localLoadAuth('secret')
    const id = localLoadAuth('id')

    fetchExtendSession(id, secret)
      .then(response => {
        if (response) {
          const data = prepareSessionResponse(response)
          store.dispatch(updateAuthInfo(data))
        }
        
        resolve(response) // result: authResponse or null
      })
  })
}
