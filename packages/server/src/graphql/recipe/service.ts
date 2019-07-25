import { Injectable } from '@nestjs/common'

import { NewRecipeInput } from './dto/input'
import { RecipesArgs } from './dto/args'
import { Recipe } from './models/recipe'
import { randomString } from '../../helpers/Adapter'


@Injectable()
export class RecipesService {
  public async create (data: NewRecipeInput): Promise<Recipe> {
    return {} as any
  }

  public async findOneById (id: string): Promise<Recipe> {
    return {} as any
  }

  public async findAll (recipesArgs: RecipesArgs): Promise<Recipe[]> {
    return [
      {
        id: randomString(),
        title: 'test',
        creationDate: new Date(),
        ingredients: ['test'],
      },
    ]
  }

  public async remove (id: string): Promise<boolean> {
    return true
  }
}
