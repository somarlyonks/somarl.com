import { Module, Global, Inject, DynamicModule, Provider } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { MongoClientOptions, MongoClient } from 'mongodb'

import { MONGO_CONNECTION_NAME, MONGO_MODULE_OPTIONS, DEFAULT_CONNECTION_NAME } from './consts'
import { getClientToken, getDbToken } from './helpers'
import { IMongoModuleOptions, IMongoModuleAsyncOptions, IMongoOptionsFactory } from './shared'


@Global()
@Module({})
export default class MongoCoreModule {
  public constructor (
    @Inject(MONGO_CONNECTION_NAME) private readonly connectionName: S,
    private readonly moduleRef: ModuleRef
  ) { }

  public static forRoot (
    uri: S,
    dbName: S,
    clientOptions: MongoClientOptions,
    connectionName: S
  ): DynamicModule {
    const connectionNameProvider = {
      provide: MONGO_CONNECTION_NAME,
      useValue: connectionName,
    }

    const clientProvider = {
      provide: getClientToken(connectionName),
      useFactory: async () => {
        const client = new MongoClient(uri, clientOptions)
        return client.connect()
      },
    }

    const dbProvider = {
      provide: getDbToken(connectionName),
      useFactory: (client: MongoClient) => client.db(dbName),
      inject: [
        getClientToken(connectionName),
      ],
    }

    return {
      module: MongoCoreModule,
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

  public static forRootAsync (options: IMongoModuleAsyncOptions): DynamicModule {
    const { connectionName = DEFAULT_CONNECTION_NAME } = options

    const connectionNameProvider = {
      provide: MONGO_CONNECTION_NAME,
      useValue: connectionName,
    }

    const clientProvider = {
      provide: getClientToken(connectionName),
      useFactory: async (mongoModuleOptions: IMongoModuleOptions) => {
        const { uri, clientOptions = MONGO_MODULE_OPTIONS } = mongoModuleOptions
        const client = new MongoClient(uri, clientOptions)
        return client.connect()
      },
      inject: [
        MONGO_MODULE_OPTIONS,
      ],
    }

    const dbProvider = {
      provide: getDbToken(connectionName),
      useFactory: (mongoModuleOptions: IMongoModuleOptions, client: MongoClient) =>
        client.db(mongoModuleOptions.dbName),
      inject: [
        MONGO_MODULE_OPTIONS,
        getClientToken(connectionName),
      ],
    }

    const asyncProviders = this.createAsyncProviders(options)

    return {
      module: MongoCoreModule,
      imports: options.imports,
      providers: [
        ...asyncProviders,
        clientProvider,
        dbProvider,
        connectionNameProvider,
      ],
      exports: [
        clientProvider,
        dbProvider,
      ],
    }
  }

  private static createAsyncProviders (options: IMongoModuleAsyncOptions): L<Provider> {
    if (options.useFactory) return [this.createAsyncOptionsProvider(options)]
    if (options.useClass) return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ]
    return []
  }

  private static createAsyncOptionsProvider (options: IMongoModuleAsyncOptions): Provider {
    if (options.useFactory) return {
      provide: MONGO_MODULE_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject || [],
    }

    if (options.useClass) return {
      provide: MONGO_MODULE_OPTIONS,
      useFactory: async (optionsFactory: IMongoOptionsFactory) => optionsFactory.createMongoOptions(),
      inject: [options.useClass],
    }

    throw new Error('Invalid MongoModule options')
  }

  public async onModuleDestroy () {
    const client: MongoClient = this.moduleRef.get(getClientToken(this.connectionName))
    if (client && client.isConnected()) client.close()
  }
}
