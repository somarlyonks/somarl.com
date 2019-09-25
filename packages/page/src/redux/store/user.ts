import redux, { IAction, IReducers } from '../framework'
import { registerActions } from '../helpers'
import { IUser } from '../../helpers/Adapter'


export interface IUserState {
  isLoggedIn: boolean
  user: undefined | IUser
}

export type IUserAction = IAction<'LOGIN', IUser>
                        | IAction<'LOGOUT'>

const actionTypes = [ 'LOGIN'
                    , 'LOGOUT' ] as const

const ActionTypes = registerActions(actionTypes, 'user')

const reducers: IReducers<IUserState, Resolved<IUserAction>> = {
  isLoggedIn (state, action) {
    if (action.type === ActionTypes.LOGIN) return true
    if (action.type === ActionTypes.LOGOUT) return false
    return state
  },

  user (state, action) {
    if (action.type === ActionTypes.LOGIN) return action.payload
    if (action.type === ActionTypes.LOGOUT) return undefined
    return state
  },
}

const reducer = redux.combineReducers(reducers)

export default {
  ActionTypes,
  reducer,
}
