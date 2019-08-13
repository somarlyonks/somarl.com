import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common'

import { SETTINGS } from '../settings'
import AppController from './controller'
import AppService from './service'
import { CorsMiddleware, LoggerMiddleware } from './middlewares'
import ApiModule from '../api'
import ArangoModule from '../arango'
import GraphQLModule from '../graphql'


@Module({
  imports: [
    ApiModule,
    ArangoModule.forRoot({
      url: SETTINGS.ARANGO_URI,
      dbName: SETTINGS.DB,
      arangoVersion: SETTINGS.ARANGO_VERSION,
      username: SETTINGS.ARANGO_USERNAME,
      password: SETTINGS.ARANGO_PASSWORD,
    }),
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
