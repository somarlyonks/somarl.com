
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'

import DoctypeModule from './doctype/module'
import ImageModule from './image/module'
import RecipeModule from './recipe/module'
import UserModule from './user/module'


@Module({
  imports: [
    DoctypeModule,
    ImageModule,
    RecipeModule,
    UserModule,
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      installSubscriptionHandlers: true,
      autoSchemaFile: 'src/graphql/schema.gql',
      context: ({ req }) => ({ req }),
    }),
  ],
})
export default class GraphQLWrapModule {}
