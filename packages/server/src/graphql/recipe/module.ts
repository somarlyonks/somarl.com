import { Module } from '@nestjs/common'
import { DateScalar } from '../shared/scalars'
import { RecipesResolver } from './resolver'
import { RecipesService } from './service'
import { RecipeRepo } from './repos'


const RESOURCE_NAME = 'recipe'

@Module({
  providers: [
    {
      provide: 'RESOURCE_NAME',
      useValue: RESOURCE_NAME,
    },
    RecipesResolver,
    RecipesService,
    RecipeRepo,
    DateScalar,
  ],
})
export default class RecipesModule {}
