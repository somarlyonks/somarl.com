import { IMiddleware } from '../lib'
import { randomString } from '../../helpers/Adapter'


/** @description Catch action errors and stop propagating. */
export const errorMiddleware: IMiddleware = ({dispatch}) => next => action => {
  if (!action.errMsg) return next(action)
  return next({ ...action, type: `@@redux/errorMiddleware${randomString()}` })
}
