import { NestFactory } from '@nestjs/core'
import { Logger, ValidationPipe } from '@nestjs/common'
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express'

import AppModule from './app'
import { LoggerService } from './shared'
import SETTINGS from './settings'


async function bootstrap () {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    {
      logger: new LoggerService(),
    }
  )
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(SETTINGS.SERVER_PORT)
  Logger.log(`🚀  http://127.0.0.1:${SETTINGS.SERVER_PORT}`)
}

bootstrap()
