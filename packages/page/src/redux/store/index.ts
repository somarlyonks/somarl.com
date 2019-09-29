import redux, { IStore, IReducers, IActions, IBoundActions, IMiddleware } from '../framework'
import {
  createContext,
  promiseMiddleware, errorMiddleware, LoggerMiddleware
} from '../middlewares'

// order by alaphbet, except global
import sGlobal, { IGlobalState, IGlobalAction } from './global'
import sFetch, { IFetchState, IFetchAction } from './fetch'
import sLocal, { ILocalState, ILocalAction } from './local'
import sQiniu, { IQiniuState, IQiniuAction } from './qiniu'
import sUser, { IUserState, IUserAction } from './user'
import { applyMiddleware } from '../framework/middleware'


export interface IImplState {
  global: IGlobalState
  fetch: IFetchState
  local: ILocalState
  qiniu: IQiniuState
  user: IUserState
}

export interface IImplActions extends IActions<IImplState> {
  global: IGlobalAction
  fetch: IFetchAction
  local: ILocalAction
  qiniu: IQiniuAction
  user: IUserAction
}

export type IImplAction = IGlobalAction
                        | IFetchAction
                        | ILocalAction
                        | IQiniuAction
                        | IUserAction

export const ActionTypes = {
  global: sGlobal.ActionTypes,
  fetch: sFetch.ActionTypes,
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
  fetch: {
    progress: undefined,
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
  fetch: sFetch.reducer,
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
; (window as any).store = store
