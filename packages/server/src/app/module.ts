import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common'

import { SETTINGS } from '../settings'
import AppController from './controller'
import AppService from './service'
import { CorsMiddleware, LoggerMiddleware } from './middlewares'
import ApiModule from '../api'
import MongoModule from '../mongo'
import GraphQLModule from '../graphql'


@Module({
  imports: [
    ApiModule,
    MongoModule.forRoot(SETTINGS.MONGO_URI, SETTINGS.MONGO_DB),
    GraphQLModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
})
export default class ApplicationModule {
  public configure (consumer: MiddlewareConsumer) {
    CorsMiddleware.configure({
      origin (requestOrigin: S | void, cb: F) {
        if (!requestOrigin || SETTINGS.ALLOWED_ORIGINS.includes(requestOrigin)) cb(null, true)
        else cb(new Error('Not allowed by CORS'))
      },
    })
    consumer
      .apply(
        LoggerMiddleware,
        CorsMiddleware
      )
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      })
  }
}
