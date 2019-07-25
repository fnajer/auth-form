import { ofType } from 'redux-observable'
import { switchMap, catchError } from 'rxjs/operators'
import { of, concat } from 'rxjs'
import axios from 'axios'
import { API_BASE, DEFAULT_LANGUAGE } from 'shared/constants'

import {
  updateLanguagesList,
  loadLanguagesList,
  chooseLanguage,
} from '../actions'

export function fetchLanguages() {
  return axios({
    url: `${API_BASE}/languages`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

const languagesListEpic = action$ =>
  action$.pipe(
    ofType(loadLanguagesList),
    switchMap(
      action => fetchLanguages(),
      (action, response) => [response, action]
    ),
    switchMap(([response, action]) => {
      const defaultLanguage = response.data.find(lang => (
        lang.code === DEFAULT_LANGUAGE
      ))

      return concat(
        of(updateLanguagesList(response.data)), 
        of(chooseLanguage(defaultLanguage)),
      )
    }),
    catchError(error => {
      console.log(error)
    })
  )

export default languagesListEpic
