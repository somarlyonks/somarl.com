import jsonwebtoken from 'jsonwebtoken'
import koaJwt from 'koa-jwt'
import koa from 'koa'
import { SETTINGS } from '../settings'


export const jwt = () => koaJwt(SETTINGS.JWT_OPTIONS)


export const jwtErrorHandler: F0<koa.Middleware> = () => (ctx, next) => {
  return next().catch(err => {
    if (err.status === HTTPStatusCodes.UNAUTHORIZED) {
      ctx.status = HTTPStatusCodes.UNAUTHORIZED
      ctx.body = { error: 'Not authorized' }
    } else throw err
  })
}


export const jwtIssue = (payload: S | O | Buffer) => jsonwebtoken.sign(payload, SETTINGS.JWT_SECRET)
