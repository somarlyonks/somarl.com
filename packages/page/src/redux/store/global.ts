/**
 * @file global context
 * @description it also works as the example of how to use the dialected redux
 *   with definitely typed actions and payloads.
 */

import redux, { IAction, IReducers } from '../framework'
import { registerActions } from './helpers'


export interface IGlobalState {
  testCount: N
  errMsgs: Set<S>
}

/**
 * @description Define the strictly typed action here. The defined type is not real
 *   but a trick just for hints. The real action type are processed in
 *   `./helpers/registerAction`. You are supposed to create action like:
 * @example
 *   const action = {type: ActionTypes.INCREMENT, payload: 1} // good
 *   const action = {type: ActionTypes.INCREMENT, payload: '1'} // type error
 */
export type IGlobalAction = IAction<'INCREMENT', N>
                          | IAction<'DECREMENT', S>
                          | IAction<'RESOLVE_ERROR', S>

/**
 * @description Types in typescript are not datas as dependent type langs like Idris,
 *    so we have to manully registerActions here.
 */
const actionTypes = [ 'INCREMENT'
                    , 'DECREMENT'
                    , 'RESOLVE_ERROR' ] as const

const ActionTypes = registerActions(actionTypes, 'global')

/** @description The real reducers only have to deal with the resolved actions. */
const reducers: IReducers<IGlobalState, Resolved<IGlobalAction>> = {
  errMsgs (state: Set<S>, action: IAction) {
    if (action.errMsg) {
      if (action.type !== ActionTypes.RESOLVE_ERROR) return state.add(action.errMsg)
      state.delete(action.errMsg)
    }
    return state
  },

  testCount (state: N, action: Resolved<IGlobalAction>): N {
    if (action.type === ActionTypes.INCREMENT) return state + action.payload
    if (action.type === ActionTypes.DECREMENT) return state - parseInt(action.payload, 10)

    return state
  },
}

const reducer = redux.combineReducers(reducers)

export default {
  ActionTypes,
  reducer,
}
