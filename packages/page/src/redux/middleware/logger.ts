import { IDispatcher, IAction, IMiddlewareAPI } from '../framework'


/** @description Temporary logger for debug in console. */
export function loggerMiddleware <TState, TAction extends IAction> ({ getState }: IMiddlewareAPI<TState, TAction>) {
  return (next: IDispatcher<TAction>) => (action: TAction) => {
    console.info('[redux]:', getState())
    return next(action)
  }
}
