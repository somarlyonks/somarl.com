import { GraphQLDefinitionsFactory } from '@nestjs/graphql'
import { join } from 'path'


const definitionsFactory = new GraphQLDefinitionsFactory()

definitionsFactory.generate({
  typePaths: ['./schema.gql'],
  path: join(process.cwd(), '../pipe/src/graphql.ts'),
  outputAs: 'interface',
  debug: true,
  // watch: true,
})
