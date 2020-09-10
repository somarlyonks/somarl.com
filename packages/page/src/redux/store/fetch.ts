import redux, { IAction, IReducers } from '../lib'
import { registerActions } from '../helpers'


export interface IFetchState {
  progress?: N
}

export type IFetchAction = IAction<'SET_PROGRESS', N | undefined>
                         | IAction<'SUCCESS', S>
                         | IAction<'FAIL', S>

const actionTypes = [ 'SET_PROGRESS'
                    , 'SUCCESS'
                    , 'FAIL' ] as const

const ActionTypes = registerActions(actionTypes, 'fetch')

const reducers: IReducers<IFetchState, Resolved<IFetchAction>> = {
  progress (state, action) {
    if (action.type === ActionTypes.SET_PROGRESS) return action.payload
    return state
  },
}

const reducer = redux.combineReducers(reducers)

export default {
  ActionTypes,
  reducer,
}
