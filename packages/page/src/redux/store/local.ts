import { registerActions } from './helpers'
import { IAction } from '../framework'


export type ILocalState = N


export type ILocalAction = IAction<'INCREMENT', N>
                         | IAction<'MINUS',     N>

const actionTypes = [
  'INCREMENT',
  'MINUS',
] as const

const ActionTypes = registerActions(actionTypes, 'local')


function reducer (state: ILocalState, action: Resolved<ILocalAction>) {
  if (action.type === ActionTypes.INCREMENT) return state + action.payload
  if (action.type === ActionTypes.MINUS) return state - action.payload
  return state
}

export default {
  ActionTypes,
  reducer,
}
