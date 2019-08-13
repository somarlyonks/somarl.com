import { Module, DynamicModule } from '@nestjs/common'

import ArangoCoreModule, { IArangoModuleOptions } from './core'


@Module({})
export default class ArangoModule {
  public static forRoot (
    options: IArangoModuleOptions
  ): DynamicModule {
    return {
      module: ArangoModule,
      imports: [
        ArangoCoreModule.forRoot(options),
      ],
    }
  }
}
