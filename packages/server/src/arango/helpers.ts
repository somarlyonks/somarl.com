import { randomString } from '../helpers/Adapter'

const hash = randomString()

export function getClientToken (connectionName: S) {
  return `${connectionName}Client-${hash}`
}

export function getDbToken (connectionName: S) {
  return `${connectionName}Db-${hash}`
}
