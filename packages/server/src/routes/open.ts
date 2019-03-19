import Router from 'koa-router'
import { jwtIssue } from '../helpers/auth'
import registerBingRouter from '../api/binks'
import registerWeatherRouter from '../api/weather'


function registerAuthRoutes (router: Router) {
  router.post('/auth', async ctx => {
    const { username, password } = ctx.request.body as any // TODO: assert

    if (username === 'Sy' && password === 'pwd') {
      ctx.body = {
        token: jwtIssue({ user: 'Sy' }),
      }
    } else {
      ctx.status = HTTPStatusCodes.UNAUTHORIZED
      ctx.body = { error: 'Invalid login' }
    }
  })
}

export default function registerOpenRoutes (router: Router) {
  router.get('/', async ctx => {
    const name = ctx.request.query.name || '..., stranger?'
    ctx.body = {
      message: `Hello from somarl.com to ${name}!`,
    }
  })

  router.post('/', async ctx => {
    const name = (ctx.request.body as { name?: string }).name || '..., stranger?'
    ctx.body = {
      message: `Hello from somarl.com to ${name}!`,
    }
  })

  registerAuthRoutes(router)

  registerBingRouter(router)
  registerWeatherRouter(router)
}
