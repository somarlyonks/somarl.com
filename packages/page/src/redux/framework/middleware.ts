import { compose } from 'src/helpers/func'
import { IStoreFactory, IEnhancer, IAction, IStore, IMiddleware, IMiddlewareAPI } from './shared'


export function applyMiddleware <TState, TAction extends IAction> (
  ...middlewares: L<IMiddleware<TState, TAction>>
): IEnhancer {
  return (createStore: IStoreFactory) => ((reducer, attach = {}) => {
    const store = createStore(reducer, attach) as unknown as IStore<TState, TAction>

    let dispatch: F = () => {
      throw new Error('Dispatching while constructing your middleware is not allowed. ')
    }
    const middlewareAPI: IMiddlewareAPI<TState, TAction> = {
      getState: store.getState,
      dispatch: (action: TAction) => dispatch(action),
    }
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch,
    }
  }) as IStoreFactory
}
