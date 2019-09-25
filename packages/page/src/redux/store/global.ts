/**
 * @file global context
 * @description it also works as the example of how to use the dialected redux
 *   with definitely typed actions and payloads.
 */

import redux, { IAction, IReducers } from '../framework'
import { registerActions } from '../helpers'


export type GTermianlState = 'focus'  // show terminal output when focus
                           | 'blur'   // hide terminal output when blur
                           | 'output' // show output article panel when output


export interface IGlobalState {
  testCount: N
  errMsgs: L<S>
  themeColor: S
  terminalState: GTermianlState
  richOutput: S
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
                          | IAction<'SET_THEMECOLOR', S>
                          | IAction<'SET_TERMINALSTATE', GTermianlState>
                          | IAction<'SET_RICHOUTPUT', S>

/**
 * @description Types in typescript are not datas as dependent type langs like Idris,
 *    so we have to manully registerActions here.
 */
const actionTypes = [ 'INCREMENT'
                    , 'DECREMENT'
                    , 'RESOLVE_ERROR'
                    , 'SET_THEMECOLOR'
                    , 'SET_TERMINALSTATE'
                    , 'SET_RICHOUTPUT'] as const

const ActionTypes = registerActions(actionTypes, 'global')

/** @description The real reducers only have to deal with the resolved actions. */
const reducers: IReducers<IGlobalState, Resolved<IGlobalAction>> = {
  errMsgs (state, action) {
    if (action.errMsg) {
      if (action.type !== ActionTypes.RESOLVE_ERROR) return state.concat(action.errMsg!)
      return state.filter(s => s !== action.errMsg)
    }
    return state
  },

  testCount (state, action) {
    if (action.type === ActionTypes.INCREMENT) return state + action.payload
    if (action.type === ActionTypes.DECREMENT) return state - parseInt(action.payload, 10)

    return state
  },

  themeColor (state, action) {
    if (action.type === ActionTypes.SET_THEMECOLOR) return action.payload
    return state
  },

  terminalState (state, action) {
    if (action.type === ActionTypes.SET_TERMINALSTATE) return action.payload
    return state
  },

  richOutput (state, action) {
    if (action.type === ActionTypes.SET_RICHOUTPUT) return action.payload
    return state
  },
}

const reducer = redux.combineReducers(reducers)

export default {
  ActionTypes,
  reducer,
}
