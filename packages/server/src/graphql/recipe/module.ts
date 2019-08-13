import { Module } from '@nestjs/common'

import RecipeResolver from './resolver'
import RecipeService from './service'
import { RecipeRepo } from './repos'

import { DateScalar } from '../shared/scalars'
import { SETTINGS } from '../../settings'
import DatabaseModel from '../../arango'
import { getDbToken } from '../../arango/helpers'


const RESOURCE_NAME = 'recipe'

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
    RecipeResolver,
    RecipeService,
    RecipeRepo,
    DateScalar,
  ],
})
export default class RecipesModule {}
