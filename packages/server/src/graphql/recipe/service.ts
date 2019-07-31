import { ObjectID } from 'mongodb'
import { Injectable } from '@nestjs/common'

import { NewRecipeInput, RecipesArgs } from './dto'
import { Recipe } from './models'
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
    return this.recipeRepo.findOne({ _id: new ObjectID(id) })
  }

  public async findAll (recipesArgs: RecipesArgs): Promise<Recipe[]> {
    return this.recipeRepo.find(
      {},
      {
        limit: recipesArgs.take,
        skip: recipesArgs.skip,
      }
    )
  }

  public async removeById (id: S): Promise<boolean> {
    return this.recipeRepo.delete({ _id: new ObjectID(id) })
  }
}
