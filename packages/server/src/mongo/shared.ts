import { ModuleMetadata, Type } from '@nestjs/common/interfaces'


export interface IMongoModuleOptions {
  uri: S
  dbName: S
  clientOptions: A
  connectionName: S
}

type PR<T> = Promise<T> | T

export interface IMongoOptionsFactory {
  createMongoOptions (): PR<IMongoModuleOptions>
}

export interface IPartialMongoModuleOptions {
  uri: S
  dbName: S
  clientOptions?: A
}

export interface IMongoModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  connectionName?: S
  useClass?: Type<IMongoOptionsFactory>
  useFactory?: F<PR<IPartialMongoModuleOptions>>
  inject?: L<A>
}
