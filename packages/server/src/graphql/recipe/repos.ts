import { Injectable } from '@nestjs/common'

import { Repo } from '../../arango'
import { Recipe } from './models'
import { IRecipeRepo } from './specs'


@Injectable()
export class RecipeRepo extends Repo<Recipe> implements IRecipeRepo {
  protected async preCreate (data: ModelData<Recipe>) {
    console.log('Extra things done before create!!!')
    return data
  }
}
