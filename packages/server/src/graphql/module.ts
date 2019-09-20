import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import ImageModule from './image/module'
import RecipeModule from './recipe/module'
import UserModule from './user/module'


@Module({
  imports: [
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
