import redux, { IStore, IReducers, IActions, IBoundActions, IMiddleware } from '../framework'
import { createContext, promiseMiddleware, errorMiddleware } from '../middleware'

import sGlobal, { IGlobalState, IGlobalAction } from './global'
import sLocal, { ILocalState, ILocalAction } from './local'
import { applyMiddleware } from '../framework/middleware'


export interface IImplState {
  global: IGlobalState
  local: ILocalState
}

export interface IImplActions extends IActions<IImplState> {
  global: IGlobalAction
  local: ILocalAction
}

export type IImplAction = IGlobalAction
                        | ILocalAction

export const ActionTypes = {
  global: sGlobal.ActionTypes,
  local: sLocal.ActionTypes,
}

const preloadedState: IImplState = {
  global: {
    testCount: 0,
    errMsgs: new Set(),
  },
  local: 0,
}

const reducers = {
  global: sGlobal.reducer,
  local: sLocal.reducer,
} as IReducers<IImplState, IImplAction>

export const actions: IBoundActions<IImplState, IImplActions> = redux.bindActions(ActionTypes)

const store = redux.createStore<IImplState, IImplAction>(
  redux.combineReducers(reducers), {
    preloadedState,
    enhancer: applyMiddleware(
      promiseMiddleware as IMiddleware<IImplState, IImplAction>,
      errorMiddleware
    ),
  }
)

export default store

export const { StoreContext, useMappedState } = createContext<IImplState, IImplAction, IStore<IImplState, IImplAction>>(store)
; (window as any).store = store
