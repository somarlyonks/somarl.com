import Router from 'koa-router'
import registerUserRoutes from './routes/user'
import registerOpenRoutes from './routes/open'
import { jwt, jwtErrorHandler } from './helpers/auth'


export const router = new Router()

router.use(jwtErrorHandler()).use(jwt())

registerUserRoutes(router)


export const openRouter = new Router()

registerOpenRoutes(openRouter)
