export interface IAction {
  type: S | N
}

export type IListener = F0<void>

export type IDispatcher <TAction extends IAction = IAction> = (action: TAction) => TAction

export interface IStore <TState, TAction extends IAction> {
  dispatch: IDispatcher<TAction>
  subscribe (listener: IListener): F0<void>
  getState (): TState | undefined
  replaceReducer (nextReducer: IReducer<TState, TAction>): void
}

export interface IStoreFactoryAttach <TState> {
  preloadedState?: TState
  enhancer?: IEnhancer
}

export type IReducer <TState, TAction extends IAction> = F2<TState, TAction, TState>

export type IReducers <TState, TAction extends IAction> = {
  [K in keyof TState]: IReducer<TState[K], TAction>
}

export type IStoreFactory = <
  TState,
  TAction extends IAction
> (
  reducer: IReducer<TState, TAction>,
  attach?: IStoreFactoryAttach<TState>
) => IStore<TState, TAction>

export type IEnhancer = (next: IStoreFactory) => IStoreFactory

export interface IMiddlewareAPI <TState, TAction extends IAction> {
  dispatch: IDispatcher<TAction>
  getState (): TState | undefined
}

export interface IMiddleware <TState, TAction extends IAction > {
  (api: IMiddlewareAPI<TState, TAction>): (next: IDispatcher<TAction>) => IDispatcher<TAction>
}
