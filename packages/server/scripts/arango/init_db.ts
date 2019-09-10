import { Database } from 'arangojs'
import S from '../../src/settings'
import chalk from 'chalk'

import { createCollection } from './create_collection'


async function createCollections () {
  let code = 0
  for (const collectionName of S.BUILTIN_COLLECTIONS) {
    code |= await createCollection(collectionName)
  }

  if (code) process.exit(code)
}


async function createDatabase (db: Database) {
  try {
    console.info(chalk.green('Creating databse.'))
    db.createDatabase(S.DB)
    console.log(chalk.green('Created databse', S.DB))
  } catch (error) {
    console.error(chalk.red(error))
    process.exit(1)
  }
}


async function main () {
  console.info(chalk.green('Setting up arangodb environment.'))

  const db = new Database(S.ARANGO_URI)
  try {
    console.info(chalk.green('Login.'))
    await db.login(S.ARANGO_USERNAME, S.ARANGO_PASSWORD)
  } catch (error) {
    console.error(chalk.red(error))
    console.info(
      chalk.red('Failed to login.'),
      chalk.blue('Have you created user and configured them in the environment?'),
      chalk.blue('You may find packages/server/README.md#ArangoDB useful.')
    )
    process.exit(1)
  }

  await createDatabase(db)
  await createCollections()

  // TODO: @sy import basic development dataset
}

main()
