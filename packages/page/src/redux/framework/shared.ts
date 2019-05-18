export interface IAction {
  type: S | N
}

export type IListener = F0<void>

export interface IStore<TState, TAction extends IAction> {
  dispatch <T extends TAction> (action: T): T
  subscribe (listener: IListener): F0<void>
  getState (): TState | undefined
  replaceReducer (nextReducer: IReducer<TState, TAction>): void
}

export interface  IStoreFactoryAttach <TState> {
  preloadedState?: TState
  enhancer?: IEnhancer
}

export type IReducer <TState, TAction extends IAction> = F2<TState, TAction, TState>

type IStoreFactory = <
  TState,
  TAction extends IAction
> (
  reducer: IReducer<TState, TAction>,
  attach?: IStoreFactoryAttach<TState>
) => IStore<TState, TAction>

export type IEnhancer = (next: IStoreFactory) => IStoreFactory
