import Koa from 'koa'
import Bodyparser from 'koa-bodyparser'
import cors from 'koa-cors'
import logger from 'koa-logger'
import chalk from 'chalk'
import { connectMongo } from './mongo'
import { router, openRouter } from './router'
import { SETTINGS } from './settings'


const ppap = new Koa()


ppap.use(logger())
  .use(Bodyparser())
  /**
   * about proxy
   * @see https://github.com/koajs/koa/issues/198#issuecomment-33208283
   */
  .use(cors({ origin: 'http://localhost:3000'}))
  .use(router.routes()).use(router.allowedMethods())
  .use(openRouter.routes()).use(openRouter.allowedMethods())


connectMongo(ppap)
  .then(app => {
    app.listen(SETTINGS.KOA_PORT)
    console.log(chalk.blue(`[koa] Server listening at http://127.0.0.1:${SETTINGS.KOA_PORT}`))
  })
  .catch(err => console.log(chalk.red(`[koa]: ${err}`)))
