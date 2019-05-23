import redux, { IReducers, IActions, IBoundActions } from '../framework'

import sGlobal, { IGlobalState, IGlobalAction } from './global'
import sLocal, { ILocalState, ILocalAction } from './local'


export interface IImplState {
  global: IGlobalState
  local: ILocalState
}

export interface IImplActions extends IActions<IImplState> {
  global: IGlobalAction
  local: ILocalAction
}

export type IImplAction = IGlobalAction | ILocalAction

export const ActionTypes = {
  global: sGlobal.ActionTypes,
  local: sLocal.ActionTypes,
}

const preloadedState: IImplState = {
  global: 0,
  local: 0,
}

const reducers = {
  global: sGlobal.reducer,
  local: sLocal.reducer,
} as IReducers<IImplState, IImplAction>

export const actions: IBoundActions<IImplState, IImplActions> = redux.bindActions(ActionTypes)

const store = redux.createStore<IImplState, IImplAction>(
  redux.combineReducers(reducers),
  { preloadedState }
)

export default store
