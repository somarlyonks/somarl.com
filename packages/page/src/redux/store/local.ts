import { registerActions } from './helpers'


export type ILocalState = N


export type ILocalAction = {
  type: 'INCREMENT'
  payload: N
} | {
  type: 'MINUS'
  payload: N
}

const actionTypes = [
  'INCREMENT',
  'MINUS',
] as const

const ActionTypes = registerActions(actionTypes, 'local')


function reducer (state: ILocalState, action: ILocalAction) {
  if (action.type === ActionTypes.INCREMENT) return state + action.payload
  if (action.type === ActionTypes.MINUS) return state - action.payload
  return state
}

export default {
  ActionTypes,
  reducer,
}
