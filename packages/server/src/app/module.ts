import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'

import AppController from './controller'
import AppService from './service'
import RecipeModule from '../recipe/module'


@Module({
  imports: [
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
export default class ApplicationModule {}
