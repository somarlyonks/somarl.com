import { Database } from 'arangojs'
import S from '../../src/settings'
import chalk from 'chalk'


function getArg (tag: string, fallback: string = ''): string {
  const { argv } = process
  const index = argv.findIndex(arg => arg === tag)
  if (index !== -1 && argv.length > index + 1) return argv[index + 1]
  return fallback
}

async function main () {
  const collectionName = getArg('-c', getArg('--collection'))
  if (!collectionName) return
  console.info(
    chalk.green('Creating collection with name:'),
    chalk.blue(collectionName)
  )

  const db = new Database(S.ARANGO_URI)
  await db.login(S.ARANGO_USERNAME, S.ARANGO_PASSWORD)
  db.useDatabase(S.DB)
  const collection = db.collection(collectionName)

  try {
    await collection.create()
    console.log(chalk.green('Created collection', collectionName))
  } catch (error) {
    console.error(chalk.red(error))
  }
}

main()
