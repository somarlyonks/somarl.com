import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'

import { SETTINGS } from '../settings'
import AppController from './controller'
import AppService from './service'
import { CorsMiddleware, LoggerMiddleware } from './middlewares'
import ApiModule from '../api/module'
import RecipeModule from '../graphql/recipe/module'


@Module({
  imports: [
    ApiModule,
    RecipeModule,
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      installSubscriptionHandlers: true,
      autoSchemaFile: 'src/graphql/schema.gql',
    }),
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
