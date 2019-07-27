import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import RecipeModule from './recipe/module'


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
})
export default class GraphQLWrapModule {}
