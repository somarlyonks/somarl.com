import { Module } from '@nestjs/common'

import UserRepo from './repo'
import UserService from './service'
import UserResolver from './resolver'
import { RESOURCE_NAME } from './consts'

import { DateScalar } from '../shared'
import DatabaseModel, { getDbToken } from '../../arango'
import SETTINGS from '../../settings'


@Module({
  imports: [
    DatabaseModel.forRoot({
      url: SETTINGS.ARANGO_URI,
      dbName: SETTINGS.DB,
      username: SETTINGS.ARANGO_USERNAME,
      password: SETTINGS.ARANGO_PASSWORD,
      connectionName: RESOURCE_NAME,
    }),
  ],
  providers: [
    {
      provide: 'RESOURCE_NAME',
      useValue: RESOURCE_NAME,
    },
    {
      provide: 'RESOURCE_DB',
      useExisting: getDbToken(RESOURCE_NAME),
    },
    UserResolver,
    UserService,
    UserRepo,
    DateScalar,
  ],
  exports: [
    UserService,
  ],
})
export default class UserModule {}
