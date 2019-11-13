import { Module, DynamicModule, Inject, Global, Logger } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { Database } from 'arangojs'
import { LoadBalancingStrategy } from 'arangojs/lib/cjs/connection'

import { ARANGO_CONNECTION_NAME, DEFAULT_CONNECTION_NAME } from './consts'
import { getClientToken, getDbToken } from './helpers'


export interface IArangoModuleOptions {
  url: S | L<S>
  dbName: S
  connectionName?: S
  username?: S
  password?: S
  // raw
  isAbsolute?: boolean
  arangoVersion?: N
  loadBalancingStrategy?: LoadBalancingStrategy
  maxRetries?: false | N
  agent?: A
  agentOptions?: {
    [key: string]: A
  }
  headers?: {
    [key: string]: S
  }
}

export interface IArangoOptionsFactory {
  createArangoOptions (): Promise<IArangoModuleOptions> | IArangoModuleOptions
}


@Global()
@Module({})
export default class ArangoCoreModule {
  public constructor (
    @Inject(ARANGO_CONNECTION_NAME) private readonly connectionName: S,
    private readonly moduleRef: ModuleRef
  ) { }

  public static forRoot (
    options: IArangoModuleOptions
  ): DynamicModule {
    if (options.connectionName === undefined) {
      options.connectionName = DEFAULT_CONNECTION_NAME
    }

    const connectionNameProvider = {
      provide: ARANGO_CONNECTION_NAME,
      useValue: options.connectionName,
    }

    const clientProvider = {
      provide: getClientToken(options.connectionName),
      async useFactory () {
        const db = new Database(options)
        if (options.username) {
          try {
            await db.login(options.username, options.password)
          } catch (error) {
            console.info(error)
          }
        }
        Logger.log(`[AarangoDB]: Connected at ${options.url}`)
        return db
      },
    }

    const dbProvider = {
      provide: getDbToken(options.connectionName),
      useFactory (client: Database) {
        return client.useDatabase(options.dbName)
      },
      inject: [
        getClientToken(options.connectionName),
      ],
    }

    return {
      module: ArangoCoreModule,
      providers: [
        connectionNameProvider,
        clientProvider,
        dbProvider,
      ],
      exports: [
        clientProvider,
        dbProvider,
      ],
    }
  }

  public async onModuleDestroy () {
    const client: Database = this.moduleRef.get(getClientToken(this.connectionName))
    if (client) client.close()
  }
}
