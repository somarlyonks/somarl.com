import { IDispatcher, IAction, IMiddlewareAPI } from '../framework'
import { randomString } from '../../helpers/Adapter'


/** @description Catch action errors and stop propagating. */
export function errorMiddleware <TState, TAction extends IAction> ({ dispatch }: IMiddlewareAPI<TState, TAction>) {
  return (next: IDispatcher<TAction>) => (action: TAction) => {
    if (!action.errMsg) return next(action)
    return next({ ...action, type: `@@redux/errorMiddleware${randomString()}` })
  }
}
