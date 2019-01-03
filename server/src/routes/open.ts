import Router from 'koa-router'
import { jwtIssue } from '../helpers/auth'


export default function registerOpenRoutes (router: Router) {
  router.get('/', async ctx => {
    const name = ctx.request.query.name || '..., stranger?'
    ctx.body = {
      message: `Hello from somarl.com to ${name}!`
    }
  })

  router.post('/', async ctx => {
    const name = (ctx.request.body as { name?: string }).name || '..., stranger?'
    ctx.body = {
      message: `Hello from somarl.com to ${name}!`
    }
  })

  router.post('/auth', async ctx => {
    const { username, password } = ctx.request.body as any // TODO: assert

    if (username === 'Sy' && password === 'pwd') {
      ctx.body = {
        token: jwtIssue({ user: 'Sy' })
      }
    } else {
      ctx.status = HTTPStatusCodes.UNAUTHORIZED
      ctx.body = { error: 'Invalid login' }
    }
  })
}
