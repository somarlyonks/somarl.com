import Koa from 'koa'
import Bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import chalk from 'chalk'
import cors from './cors'
import { connectMongo } from './mongo'
import { router, openRouter } from './router'
import { SETTINGS } from './settings'


const ppap = new Koa()


ppap.use(logger())
  .use(Bodyparser())
  .use(cors())
  .use(router.routes()).use(router.allowedMethods())
  .use(openRouter.routes()).use(openRouter.allowedMethods())


connectMongo(ppap)
  .then(app => {
    app.listen(SETTINGS.KOA_PORT)
    console.log(chalk.blue(`[koa] Server listening at http://127.0.0.1:${SETTINGS.KOA_PORT}`))
  })
  .catch(err => console.log(chalk.red(`[koa]: ${err}`)))
