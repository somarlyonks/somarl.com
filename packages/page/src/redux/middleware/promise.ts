import { isPromise } from '../../helpers/Adapter'
import { IDispatcher } from '../framework'


export function promiseMiddleware ({ dispatch }: {dispatch: IDispatcher}) {
  return (next: F) => (action: A) => {
    if (!isPromise(action.payload)) return next(action)
    return action.payload
      .then((result: A) => dispatch({ ...action, payload: result }))
      .catch((error: A) => {
        dispatch({ ...action, payload: error, error: true })
        return Promise.reject(error)
      })
  }
}
