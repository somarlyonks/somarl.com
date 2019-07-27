import { Module } from '@nestjs/common'
import { DateScalar } from '../shared/scalars'
import { RecipesResolver } from './resolver'
import { RecipesService } from './service'


@Module({
  providers: [RecipesResolver, RecipesService, DateScalar],
})
export default class RecipesModule {}
