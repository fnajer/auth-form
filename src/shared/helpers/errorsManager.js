import { tryRefreshSession } from 'modules/Auth/epics/extendSession'

 const manageErrors = ({ retry, params, defaultValue }) => {
  return error => {
    switch (error.response.status) {
      case 401:
        return tryRefreshSession().then(response => {
          if (response) return retry(params)
          return Promise.resolve(response) // null
        })
      // default:
      //   return Promise.resolve(null)
      default:
        return Promise.resolve(defaultValue ? {
          data: defaultValue
        } : null)
    }
  }
}

export default manageErrors
