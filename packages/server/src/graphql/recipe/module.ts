import { ResourceModule } from '../shared'

import { RESOURCE_NAME } from './consts'
import { RecipeRepo } from './repos'
import RecipeResolver from './resolver'
import RecipeService from './service'


@ResourceModule(RESOURCE_NAME, {
  providers: [
    RecipeRepo,
    RecipeResolver,
    RecipeService,
  ],
})
export default class RecipesModule {}
