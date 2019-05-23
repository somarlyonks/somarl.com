import { registerActions } from './helpers'


export type ILocalState = N


export type ILocalAction = {
  type: 'ADD'
  payload: N
} | {
  type: 'MINUS'
  payload: N
}

const actionTypes = [
  'ADD',
  'MINUS',
] as const

const ActionTypes = registerActions(actionTypes, 'local')


function reducer (state: ILocalState, action: ILocalAction) {
  if (action.type === ActionTypes.ADD) return state + action.payload
  if (action.type === ActionTypes.MINUS) return state - action.payload
  return state
}

export default {
  ActionTypes,
  reducer,
}
