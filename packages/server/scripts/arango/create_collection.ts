import { Database } from 'arangojs'
import S from '../../src/settings'
import chalk from 'chalk'

export async function createCollection (collectionName: string) {
  if (!collectionName) return 0b101
  console.info(
    chalk.yellowBright('Creating collection with name:'),
    chalk.blue(collectionName)
  )

  const db = new Database(S.ARANGO_URI)
  await db.login(S.ARANGO_USERNAME, S.ARANGO_PASSWORD)
  db.useDatabase(S.DB)
  const collection = db.collection(collectionName)

  try {
    await collection.create()
    console.info(
      chalk.green('Collection'),
      chalk.blue(collectionName),
      chalk.green('created.')
    )
  } catch (error) {
    console.error(chalk.red(error))
    return 0b111
  }

  return 0
}

function getArg (tag: string, fallback: string = ''): string {
  const { argv } = process
  const index = argv.findIndex(arg => arg === tag)
  if (index !== -1 && argv.length > index + 1) return argv[index + 1]
  return fallback
}

/**
 * @example
 *   npm run create-collection -- -c user
 */
async function main () {
  const collectionName = getArg('-c', getArg('--collection'))
  if (collectionName) {
    process.exit(await createCollection(collectionName))
  }

  process.exit(1)
}

if (require.main === module) main()
