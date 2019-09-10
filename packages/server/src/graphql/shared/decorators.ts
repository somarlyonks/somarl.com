import { Module } from '@nestjs/common'
import { ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface'

import DatabaseModel, { getDbToken } from '../../arango'

import { DateScalar } from './scalars'


export function ResourceModule (RESOURCE_NAME: S, meta: ModuleMetadata) {
  return Module({
    imports: [
      DatabaseModel.forRoot({
        connectionName: RESOURCE_NAME,
      }),
      ...meta.imports || [],
    ],
    controllers: meta.controllers,
    providers: [
      {
        provide: 'RESOURCE_NAME',
        useValue: RESOURCE_NAME,
      },
      {
        provide: 'RESOURCE_DB',
        useExisting: getDbToken(RESOURCE_NAME),
      },
      DateScalar,
      ...meta.providers || [],
    ],
    exports: meta.exports,
  })
}
