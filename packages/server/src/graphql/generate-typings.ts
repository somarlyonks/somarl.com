import * as fs from 'fs-extra'
import { join } from 'path'
import { GraphQLDefinitionsFactory } from '@nestjs/graphql'


// @ts-ignore
class F$ckNestGql extends GraphQLDefinitionsFactory {
  // @ts-ignore
  private async exploreAndEmit (typePaths, path, outputAs, isDebugEnabled) {
    // @ts-ignore
    await super.exploreAndEmit(typePaths, path, outputAs, isDebugEnabled)

    const tsFile = await fs.readFile(path, 'utf-8')
    const tsScalarFixed = tsFile // FEAT: @sy dynamicly read scalar types
      .replace('export type DateString = any;', 'type DateString = S;')

    await fs.writeFile(path, tsScalarFixed, 'utf-8')
  }
}

const definitionsFactory = new F$ckNestGql()

/** @description run under packages/server or just with npm run graphql-types */
definitionsFactory.generate({
  typePaths: ['./src/graphql/schema.gql'],
  path: join(process.cwd(), '../pipe/src/graphql.ts'),
  outputAs: 'interface',
  debug: true,
  watch: !!process.argv.find(arg => arg === '-w' || arg === '--watch'),
})
