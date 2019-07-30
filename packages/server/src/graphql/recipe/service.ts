import { ObjectID } from 'mongodb'
import { Injectable } from '@nestjs/common'

import { NewRecipeInput } from './dto/input'
import { RecipesArgs } from './dto/args'
import { Recipe } from './models'
import { RecipeRepo } from './repos'
import { randomString } from '../../helpers/Adapter'


@Injectable()
export class RecipesService {
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
    const all = Array(100).fill(0).map(() => ({
      id: randomString(),
      title: 'test',
      created: new Date(),
      ingredients: ['test'],
    }))

    return all.slice(recipesArgs.skip, recipesArgs.take)
  }

  public async remove (id: string): Promise<boolean> {
    return true
  }
}
