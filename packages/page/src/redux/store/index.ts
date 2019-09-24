import redux, { IStore, IReducers, IActions, IBoundActions, IMiddleware } from '../framework'
import {
  createContext,
  promiseMiddleware, errorMiddleware, loggerMiddleware
} from '../middlewares'

import sGlobal, { IGlobalState, IGlobalAction } from './global'
import sLocal, { ILocalState, ILocalAction } from './local'
import sQiniu, { IQiniuState, IQiniuAction } from './qiniu'
import sUser, { IUserState, IUserAction } from './user'
import { applyMiddleware } from '../framework/middleware'


export interface IImplState {
  global: IGlobalState
  local: ILocalState
  qiniu: IQiniuState
  user: IUserState
}

export interface IImplActions extends IActions<IImplState> {
  global: IGlobalAction
  local: ILocalAction
  qiniu: IQiniuAction
  user: IUserAction
}

export type IImplAction = IGlobalAction
                        | ILocalAction
                        | IQiniuAction
                        | IUserAction

export const ActionTypes = {
  global: sGlobal.ActionTypes,
  local: sLocal.ActionTypes,
  qiniu: sQiniu.ActionTypes,
  user: sUser.ActionTypes,
}

const preloadedState: IImplState = {
  global: {
    testCount: 0,
    errMsgs: [],
    themeColor: 'lightCoral',
    terminalState: 'blur',
    richOutput: '',
  },
  local: 0,
  qiniu: {
    token: '',
    syncToken: '',
    url: 'https://static.qotes.top/',
  },
  user: {
    isLoggedIn: false,
    user: undefined,
  },
}

const reducers = {
  global: sGlobal.reducer,
  local: sLocal.reducer,
  qiniu: sQiniu.reducer,
  user: sUser.reducer,
} as IReducers<IImplState, IImplAction>

export const actions: IBoundActions<IImplState, IImplActions> = redux.bindActions(ActionTypes)

const store = redux.createStore<IImplState, IImplAction>(
  redux.combineReducers(reducers), {
    preloadedState,
    enhancer: applyMiddleware(
      promiseMiddleware as IMiddleware<IImplState, IImplAction>,
      loggerMiddleware,
      errorMiddleware
    ),
  }
)

export default store

export const { StoreContext, useMappedState } = createContext<IImplState, IImplAction, IStore<IImplState, IImplAction>>(store)
; (window as any).store = store
