/**
 * @file global context
 * @description it also works as the example of how to use the adapted redux
 *   with definately typed actions and payloads.
 */

import { registerActions } from './helpers'


export type IGlobalState = N

/**
 * @description Define the strictly typed action here. The defined type is not real
 *   but a trick just for hints. The real action type are processed in
 *   `./helpers/registerAction`. You are supposed to create action like:
 * @example
 *   const action = {type: ActionTypes.INCREMENT, payload: 1} // good
 *   const action = {type: ActionTypes.INCREMENT, payload: '1'} // type error
 */
export type IGlobalAction = {
  type: 'INCREMENT'
  payload: N
} | {
  type: 'DECREMENT'
  payload: S
}

/**
 * @description Types in typescript are not datas as dependent type langs like Idris,
 *    so we have to manully registerActions here.
 */
const actionTypes = [
  'INCREMENT',
  'DECREMENT',
] as const

const ActionTypes = registerActions(actionTypes, 'global')


function reducer (state: IGlobalState, action: IGlobalAction) {
  if (action.type === ActionTypes.INCREMENT) return state + action.payload
  if (action.type === ActionTypes.DECREMENT) return state - parseInt(action.payload, 10)
  return state
}

export default {
  ActionTypes,
  reducer,
}
