import { Database } from 'arangojs'
import S from '../../src/settings'
import chalk from 'chalk'


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

  try {
    console.info(chalk.green('Creating databse.'))
    db.createDatabase(S.DB)
    console.log(chalk.green('Created databse', S.DB))
  } catch (error) {
    console.error(chalk.red(error))
  }

  // import basic development dataset
}

main()
