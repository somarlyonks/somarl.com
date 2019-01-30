import koa from 'koa'
import cors from 'koa2-cors'
import { SETTINGS } from './settings'


function checkOriginAgainstWhitelist (ctx: koa.Context) {
  const requestOrigin = (ctx.accept as any).headers.origin
  console.log('rrr', requestOrigin)
  if (!SETTINGS.ALLOWED_ORIGINS.includes(requestOrigin)) {
    return false
  }
  return requestOrigin
}


export default function () {
  return cors({
    origin: checkOriginAgainstWhitelist,
  })
}
