import { isPromise } from '../../helpers/Adapter'
import { IDispatcher, IAction, IMiddlewareAPI } from '../framework'


export function promiseMiddleware <TState, TAction extends IAction> ({ dispatch }: IMiddlewareAPI<TState, TAction>) {
  return (next: IDispatcher<TAction>) => (action: TAction) => {
    if (!isPromise(action.payload)) return next(action)
    return action.payload
      .then((payload: TAction['payload']) => dispatch({ ...action, payload }))
      .catch((error: Error) => {
        console.groupCollapsed('%c[redux]: error', 'color: #e00;')
        console.error(error)
        dispatch({ ...action, payload: error, errMsg: error.message })
        console.groupEnd()
      })
  }
}
