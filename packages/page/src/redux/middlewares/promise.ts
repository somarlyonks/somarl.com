
import { isPromise } from '../../helpers/Adapter'
import { IMiddleware } from '../lib'


export const promiseMiddleware: IMiddleware = ({ dispatch }) => next => action => {
  if (!isPromise(action.payload)) return next(action)
  return action.payload
    .then(payload => dispatch({ ...action, payload }))
    .catch((error: Error) => {
      console.groupCollapsed('%c[redux]: error', 'color: #e00;')
      console.error(error)
      dispatch({ ...action, payload: error, errMsg: error.message })
      console.groupEnd()
    })
}
