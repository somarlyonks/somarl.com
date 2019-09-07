import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import RecipeModule from './recipe/module'
import UserModule from './user/module'


@Module({
  imports: [
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
