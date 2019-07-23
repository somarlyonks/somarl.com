/** @ref [FSA](https://github.com/redux-utilities/flux-standard-action) */
export interface IAction<TType extends S = S, TPayload = A> {
  type: TType
  payload: TPayload | P<TPayload>
  errMsg?: S
}

export type IListener = F0<void>

export type IDispatcher <TAction extends IAction = IAction> = F1<TAction, TAction>

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

export type IActions <TState> = {
  [K in keyof TState]: IAction
}

export type IBoundActions <TState, TActions extends IActions<TState>> = {
  [K in keyof TActions]: IActionsFactory<TActions[K]>
}

/** Is it possible to infer the specific type in discriminated unions ? */
export type IActionsFactory <TAction extends IAction> = {
  [K in TAction['type']]: IActionFactory<TAction>
}

export type IActionFactory <TAction extends IAction> = (
  payload: TAction['payload']
) => TAction

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

export interface IMiddleware <TState, TAction extends IAction> {
  (api: IMiddlewareAPI<TState, TAction>): (next: IDispatcher<TAction>) => IDispatcher<TAction>
}
