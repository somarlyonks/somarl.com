import { Injectable } from '@nestjs/common'

import { NewRecipeInput, RecipesArgs } from './dto'
import { IRecipeService } from './specs'
import { RecipeRepo } from './repos'


@Injectable()
export default class RecipeService implements IRecipeService {
  public constructor (
    public readonly recipeRepo: RecipeRepo
  ) {}

  public async create (data: NewRecipeInput) {
    return this.recipeRepo.create(data)
  }

  public async findOneById (id: S) {
    return this.recipeRepo.findOne(id)
  }

  public async findAll (recipesArgs: RecipesArgs) {
    return this.recipeRepo.find(recipesArgs)
  }

  public async removeById (id: S) {
    return this.recipeRepo.delete(id)
  }
}
