import { GraphQLDefinitionsFactory } from '@nestjs/graphql'
import { join } from 'path'


const definitionsFactory = new GraphQLDefinitionsFactory()

/** @description run under packages/server or just with npm run graphql-types */
definitionsFactory.generate({
  typePaths: ['./src/graphql/schema.gql'],
  path: join(process.cwd(), '../pipe/src/graphql.ts'),
  outputAs: 'interface',
  debug: true,
  watch: !!process.argv.find(arg => arg === '-w' || arg === '--watch'),
})
