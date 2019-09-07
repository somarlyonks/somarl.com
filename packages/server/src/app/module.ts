import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common'

import { SETTINGS } from '../settings'
import AppController from './controller'
import AppService from './service'
import { CorsMiddleware, LoggerMiddleware } from './middlewares'
import ApiModule from '../api'
import ArangoModule from '../arango'
import GraphQLModule from '../graphql'
import AuthModule from '../acl/auth'


@Module({
  imports: [
    ApiModule,
    AuthModule,
    ArangoModule.forRoot(),
    GraphQLModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
    {
      provide: 'SETTINGS',
      useValue: SETTINGS,
    },
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
