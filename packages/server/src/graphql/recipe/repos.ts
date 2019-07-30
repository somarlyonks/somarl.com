import { Injectable } from '@nestjs/common'

import { Repo } from '../../mongo'
import { Recipe } from './models'


@Injectable()
export class RecipeRepo extends Repo<Recipe> {
  protected async preCreate (data: ModelData<Recipe>) {
    console.log('Extra things done before create!!!')
    return data
  }
}
