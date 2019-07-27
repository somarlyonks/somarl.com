import { Module, DynamicModule } from '@nestjs/common'
import { MongoClientOptions } from 'mongodb'

import MongoCoreModule from './core'
import { IMongoModuleAsyncOptions } from './shared'
import { DEFAULT_CONNECTION_NAME, DEFAULT_CLIENT_OPTIONS } from './consts'


@Module({})
export default class MongoModule {
  public static forRoot (
    uri: S,
    dbName: S,
    clientOptions: MongoClientOptions = DEFAULT_CLIENT_OPTIONS,
    connectionName: S = DEFAULT_CONNECTION_NAME
  ): DynamicModule {
    return {
      module: MongoModule,
      imports: [
        MongoCoreModule.forRoot(uri, dbName, clientOptions, connectionName),
      ],
    }
  }

  public static forRootAsync (options: IMongoModuleAsyncOptions): DynamicModule {
    return {
      module: MongoModule,
      imports: [
        MongoCoreModule.forRootAsync({
          connectionName: DEFAULT_CONNECTION_NAME,
          ...options,
        }),
      ],
    }
  }
}
