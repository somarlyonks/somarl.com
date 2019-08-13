export function getClientToken (connectionName: S) {
  return `${connectionName}Client`
}

export function getDbToken (connectionName: S) {
  return `${connectionName}Db`
}
