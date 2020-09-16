
import { registerActions } from '../helpers'
import { IAction } from '../lib'

import { useLocation as _useLocation, IUseLocation } from 'src/router/hooks'
import { makeMatcher, IMatcher } from 'src/router/matcher'


export interface IRouterState {
  hook: IUseLocation
  base: S
  matcher: IMatcher
}


export const buildRouter = ({
  hook = _useLocation,
  base = '',
  matcher = makeMatcher(),
}: Partial<IRouterState> = {}) => ({ hook, base, matcher })


export type IRouterAction = IAction<'REBUILD', IRouterState>

const actionTypes = [ 'REBUILD' ] as const

const ActionTypes = registerActions(actionTypes, 'router')


function reducer (state: IRouterState, action: Resolved<IRouterAction>) {
  if (action.type === ActionTypes.REBUILD) return action.payload
  return state
}

export default {
  ActionTypes,
  reducer,
}
