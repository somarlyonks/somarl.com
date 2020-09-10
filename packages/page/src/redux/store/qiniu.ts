import redux, { IAction, IReducers } from '../lib'
import { registerActions } from '../helpers'


export interface IQiniuState {
  token: S
  url: S
  syncToken: S
}

export type IQiniuAction = IAction<'SET_QINIU_TOKEN', S>
                         | IAction<'SET_QINIU_SYNC_TOKEN', S>

const actionTypes = [ 'SET_QINIU_TOKEN'
                    , 'SET_QINIU_SYNC_TOKEN' ] as const

const ActionTypes = registerActions(actionTypes, 'qiniu')

const reducers: IReducers<IQiniuState, Resolved<IQiniuAction>> = {
  token (state, action) {
    if (action.type === ActionTypes.SET_QINIU_TOKEN) return action.payload
    return state
  },

  syncToken (state, action) {
    if (action.type === ActionTypes.SET_QINIU_SYNC_TOKEN) return action.payload
    return state
  },

  url (state, action) {
    return state
  },
}

const reducer = redux.combineReducers(reducers)

export default {
  ActionTypes,
  reducer,
}
