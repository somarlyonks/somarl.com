import koa from 'koa'
import cors from 'koa2-cors'
import { SETTINGS } from './settings'


function checkOriginAgainstWhitelist (ctx: koa.Context) {
  const requestOrigin = (ctx.accept as any).headers.origin
  return SETTINGS.ALLOWED_ORIGINS.includes(requestOrigin) && requestOrigin
}


export default function (options: cors.Options = {}) {
  return cors(Object.assign({}, {
    origin: checkOriginAgainstWhitelist,
  }, options))
}
