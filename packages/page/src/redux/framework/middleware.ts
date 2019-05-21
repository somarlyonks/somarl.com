import { compose } from '../../helpers/compose'
import { IStoreFactory, IEnhancer, IDispatcher, IAction, IStore, IReducer, IStoreFactoryAttach } from './shared'


interface IMiddlewareAPI <TState, TAction extends IAction> {
  dispatch: IDispatcher<TAction>
  getState (): TState | undefined
}

export interface IMiddleware <TState, TAction extends IAction > {
  (api: IMiddlewareAPI<TState, TAction>): (next: IDispatcher<TAction>) => IDispatcher<TAction>
}


export function applyMiddleware <TState, TAction extends IAction> (
  ...middlewares: L<IMiddleware<TState, TAction>>
): IEnhancer {
  return (createStore: IStoreFactory) => ((
    reducer: IReducer<TState, TAction>,
    attach: IStoreFactoryAttach<TState> = {}
  ) => {
    const store = createStore(reducer, attach) as IStore<TState, TAction>

    let dispatch: F = () => {
      throw new Error('Dispatching while constructing your middleware is not allowed. ')
    }
    const middlewareAPI: IMiddlewareAPI<TState, TAction> = {
      getState: store.getState,
      dispatch: (...args: L<A>) => dispatch(...args),
    }
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch,
    }
  }) as IStoreFactory
}
