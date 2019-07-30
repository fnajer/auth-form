import { ofType } from 'redux-observable'
import { of, forkJoin, concat } from 'rxjs'
import { switchMap, catchError } from 'rxjs/operators'

import { loadInitialInfo } from '../actions'
import { updateLanguagesList, chooseLanguage } from 'modules/Header/actions'
import { updateModelsList } from 'modules/LocalesManager/actions'

import { prepareModelsResponse, fetchModels } from 'modules/LocalesManager/epics/models'
import { fetchLanguages } from 'modules/Header/epics/languagesList'

import { DEFAULT_LANGUAGE } from 'shared/constants'

const initialInfoEpic = action$ =>
  action$.pipe(
    ofType(loadInitialInfo),
    switchMap(
      action => forkJoin(
        fetchLanguages(),
        fetchModels({
          code: DEFAULT_LANGUAGE
        })
      ),
      (action, responses) => {
        return [
          ...responses
        ]
      }
    ),
    switchMap(responses => {
      const [
        languagesResponse,
        modelsResponse,
      ] = responses
      const defaultLanguage = languagesResponse.data.find(lang => (
        lang.code === DEFAULT_LANGUAGE
      ))

      const modelsData = prepareModelsResponse(modelsResponse)
  
      return concat(
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
