import { Injectable } from '@nestjs/common'

import { NewRecipeInput } from './dto/input'
import { RecipesArgs } from './dto/args'
import { Recipe } from './model'
import { randomString } from '../../helpers/Adapter'
import { InjectDb } from '../../mongo'
import { Db } from 'mongodb'


@Injectable()
export class RecipesService {
  public constructor (
    @InjectDb() private readonly db: Db
  ) {}

  public async create (data: NewRecipeInput): Promise<Recipe> {
    return {} as any
  }

  public async findOneById (id: string): Promise<Recipe> {
    return {} as any
  }

  public async findAll (recipesArgs: RecipesArgs): Promise<Recipe[]> {
    console.log('xxxx', this.db) // TODELETE
    const all = Array(100).fill(0).map(() => ({
      id: randomString(),
      title: 'test',
      creationDate: new Date(),
      ingredients: ['test'],
    }))

    return all.slice(recipesArgs.skip, recipesArgs.take)
  }

  public async remove (id: string): Promise<boolean> {
    return true
  }
}
