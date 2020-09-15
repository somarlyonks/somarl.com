import redux, { IStore, IReducers, IActions, IBoundActions } from '../lib'
import {
  createContext,
  promiseMiddleware, errorMiddleware, LoggerMiddleware
} from '../middlewares'

// order by alaphbet, except global
import sGlobal, { IGlobalState, IGlobalAction } from './global'
import sFetch, { IFetchState, IFetchAction } from './fetch'
import sLocal, { ILocalState, ILocalAction } from './local'
import sQiniu, { IQiniuState, IQiniuAction } from './qiniu'
import sRouter, { IRouterState, IRouterAction, buildRouter } from './router'
import sUser, { IUserState, IUserAction, ANONYMOUS_USER } from './user'
import { applyMiddleware } from '../lib/middleware'


export interface IImplState {
  global: IGlobalState
  fetch: IFetchState
  local: ILocalState
  qiniu: IQiniuState
  router: IRouterState
  user: IUserState
}

export interface IImplActions extends IActions<IImplState> {
  global: IGlobalAction
  fetch: IFetchAction
  local: ILocalAction
  qiniu: IQiniuAction
  router: IRouterAction
  user: IUserAction
}

export type IImplAction = IGlobalAction
                        | IFetchAction
                        | ILocalAction
                        | IQiniuAction
                        | IRouterAction
                        | IUserAction

export const ActionTypes = {
  global: sGlobal.ActionTypes,
  fetch: sFetch.ActionTypes,
  local: sLocal.ActionTypes,
  qiniu: sQiniu.ActionTypes,
  router: sRouter.ActionTypes,
  user: sUser.ActionTypes,
}

const preloadedState: IImplState = {
  global: {
    ready: '',
    testCount: 0,
    errMsgs: [],
    themeColor: 'lightCoral',
    terminalState: 'blur',
    terminalOutput: '',
    richOutput: '',
  },
  fetch: {
    progress: undefined,
  },
  local: 0,
  qiniu: {
    token: '',
    syncToken: '',
    url: 'https://static.qotes.top/',
  },
  router: buildRouter(),
  user: {
    loginVisible: false,
    isLoggedIn: false,
    user: ANONYMOUS_USER,
  },
}

const reducers = {
  global: sGlobal.reducer,
  fetch: sFetch.reducer,
  local: sLocal.reducer,
  qiniu: sQiniu.reducer,
  router: sRouter.reducer,
  user: sUser.reducer,
} as IReducers<IImplState, IImplAction>

export const actions: IBoundActions<IImplState, IImplActions> = redux.bindActions(ActionTypes)

const store = redux.createStore<IImplState, IImplAction>(
  redux.combineReducers(reducers), {
    preloadedState,
    enhancer: applyMiddleware(
      promiseMiddleware,
      LoggerMiddleware.configure({
        ignores: [
          ActionTypes.fetch.SET_PROGRESS,
        ],
      }),
      errorMiddleware
    ),
  }
)

export default store

export const { StoreContext, useMappedState } = createContext<IImplState, IImplAction, IStore<IImplState, IImplAction>>(store)
; (window as A).store = store
