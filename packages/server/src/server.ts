import chalk from 'chalk'
import { NestFactory } from '@nestjs/core'
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express'

import AppModule from './app/module'
import SETTINGS from './settings'


async function bootstrap () {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter()
  )
  await app.listen(SETTINGS.SERVER_PORT)
  console.log(chalk.magenta(`[Nest] Server listening at http://127.0.0.1:${SETTINGS.SERVER_PORT}`))
}

bootstrap()
