import { Inject } from '@nestjs/common'
import { getClientToken, getDbToken } from './helpers'
import { DEFAULT_CONNECTION_NAME } from './consts'


export const InjectClient = (connectionName: S = DEFAULT_CONNECTION_NAME) => Inject(getClientToken(connectionName))

export const InjectDb = (connectionName: S = DEFAULT_CONNECTION_NAME) => Inject(getDbToken(connectionName))
