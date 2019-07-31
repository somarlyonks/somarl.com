import { Module } from '@nestjs/common'

import { DateScalar } from '../shared/scalars'
import RecipeResolver from './resolver'
import RecipeService from './service'
import { RecipeRepo } from './repos'


const RESOURCE_NAME = 'recipe'

@Module({
  providers: [
    {
      provide: 'RESOURCE_NAME',
      useValue: RESOURCE_NAME,
    },
    RecipeResolver,
    RecipeService,
    RecipeRepo,
    DateScalar,
  ],
})
export default class RecipesModule {}
