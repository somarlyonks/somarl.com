import { Module, DynamicModule } from '@nestjs/common'

import { SETTINGS } from '../settings'
import ArangoCoreModule, { IArangoModuleOptions } from './core'


@Module({})
export default class ArangoModule {
  public static forRoot (
    options: Partial<IArangoModuleOptions> = {}
  ): DynamicModule {
    return {
      module: ArangoModule,
      imports: [
        ArangoCoreModule.forRoot({
          url: SETTINGS.ARANGO_URI,
          dbName: SETTINGS.DB,
          username: SETTINGS.ARANGO_USERNAME,
          password: SETTINGS.ARANGO_PASSWORD,
          arangoVersion: SETTINGS.ARANGO_VERSION,
          ...options,
        }),
      ],
    }
  }
}
