import { ofType } from 'redux-observable'
import { of, forkJoin, concat } from 'rxjs'
import { switchMap, catchError } from 'rxjs/operators'

import { loadInitialInfo } from '../actions'
import { updateAuthInfo } from 'modules/Auth/actions'
import { updateLanguagesList, chooseLanguage } from 'modules/Header/actions'
import { updateModelsList } from 'modules/LocalesManager/actions'

import { extendSession } from 'modules/Auth/epics/extendSession'
import { prepareSessionResponse } from 'modules/Auth/epics/loadAuth'
import { prepareModelsResponse, fetchModels } from 'modules/LocalesManager/epics/models'
import { fetchLanguages } from 'modules/Header/epics/languagesList'

import { DEFAULT_LANGUAGE } from 'shared/constants'

const initialInfoEpic = action$ =>
  action$.pipe(
    ofType(loadInitialInfo),
    switchMap(
      action => forkJoin(
        extendSession(),
        fetchLanguages()
      ),
      (action, responses) => {
        return [
          ...responses
        ]
      }
    ),
    switchMap(
      ([authResponse, languagesResponse]) => {
        console.log(authResponse, languagesResponse)
        if (authResponse)
          return fetchModels({
            code: DEFAULT_LANGUAGE
          })
        else 
          return Promise.resolve(null)
      },
      ([authResponse, languagesResponse], modelsResponse) => [
        authResponse,
        languagesResponse,
        modelsResponse
      ]
    ),
    switchMap(responses => {
      const [
        authResponse,
        languagesResponse,
        modelsResponse,
      ] = responses
      const defaultLanguage = languagesResponse.data.find(lang => (
        lang.code === DEFAULT_LANGUAGE
      ))

      const authData = prepareSessionResponse(authResponse)
      const modelsData = prepareModelsResponse(modelsResponse)

      return concat(
        of(updateAuthInfo(authData)),
        of(updateLanguagesList(languagesResponse.data)),
        of(chooseLanguage(defaultLanguage)),
        of(updateModelsList(modelsData))
      )
    }),
    catchError(error => {
      console.log(error)
    })
  )

export default initialInfoEpic
