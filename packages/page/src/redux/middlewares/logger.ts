import { IDispatcher, IAction, IMiddlewareAPI } from '../framework'


/** @description Temporary logger for debug in console. */
export function loggerMiddleware <TState, TAction extends IAction> ({ getState }: IMiddlewareAPI<TState, TAction>) {
  return (next: IDispatcher<TAction>) => (action: TAction) => {
    const start = performance.now()
    const prevState = getState()
    const ret = next(action)
    const nextState = getState()
    const took = performance.now() - start

    console.groupCollapsed('[redux]: action', action.type, `in ${took.toFixed(2)}ms`)
    console.info('[redux prev state]:', prevState)
    console.info('[redux action]:', action)
    console.info('[redux next state]:', nextState)
    console.groupEnd()

    return ret
  }
}
