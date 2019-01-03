import Router from 'koa-router'
import { __C, Q } from '../helpers/query'


const C = __C('try_koa')('user')


export default function registerUserRoutes (router: Router) {
  router.get('/user', async ctx => {
    ctx.body = await C(ctx).find().toArray()
  })
  router.post('/user', async ctx => {
    const person = ctx.request.body
    if (person) {
      ctx.body = await C(ctx).insert(person)
    }
  })

  router.get('/user/:id', async ctx => {
    ctx.body = await C(ctx).findOne(Q(ctx.params.id))
  })
  router.put('/user/:id', async ctx => {
    const data = ctx.request.body
    if (data) {
      ctx.body = await C(ctx).updateOne(Q(ctx.params.id), { $set: data })
    }
  })
  router.del('/user/:id', async ctx => {
    ctx.body = await C(ctx).deleteOne(Q(ctx.params.id))
  })
}
