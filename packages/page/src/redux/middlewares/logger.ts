import { IMiddleware } from '../lib'


interface ILoggerMiddlewareOptions {
  ignores?: L<S>
}

/** @description Temporary logger for debug in console. */
export class LoggerMiddleware {
  public static configure ({ ignores = [] }: ILoggerMiddlewareOptions = {}) {
    const loggerMiddleware: IMiddleware = ({ getState }) => next => action => {
      if (ignores.includes(action.type)) return next(action)

      const start = performance.now()
      const prevState = getState()
      const ret = next(action)
      const nextState = getState()
      const took = performance.now() - start

      console.groupCollapsed('[redux]: action', action.type, `in ${took.toFixed(2)}ms`)
      console.info('[redux prev state]:', prevState)
      console.info('[redux action]:', action)
      console.info('[redux next state]:', nextState)
      console.groupEnd()

      return ret
    }

    return loggerMiddleware
  }
}
