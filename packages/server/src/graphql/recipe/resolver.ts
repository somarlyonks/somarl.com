import { NotFoundException } from '@nestjs/common'
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'apollo-server-express'

import { NewRecipeInput } from './dto/input'
import { RecipesArgs } from './dto/args'
import { Recipe } from './models'
import { RecipesService } from './service'


const pubSub = new PubSub()

@Resolver(() => Recipe)
export class RecipesResolver {
  public constructor (private readonly recipesService: RecipesService) {}

  @Query(returns => Recipe)
  public async recipe (@Args('id') id: string): Promise<Recipe> {
    const recipe = this.recipesService.findOneById(id)
    if (!await recipe) throw new NotFoundException(id)

    return recipe as Promise<Recipe>
  }

  @Query(returns => [Recipe])
  public recipes (@Args() recipesArgs: RecipesArgs): Promise<Recipe[]> {
    return this.recipesService.findAll(recipesArgs)
  }

  @Mutation(returns => Recipe)
  public async addRecipe (
    @Args('newRecipeData') newRecipeData: NewRecipeInput
  ): Promise<Recipe> {
    const recipe = this.recipesService.create(newRecipeData)
    pubSub.publish('recipeAdded', { recipeAdded: await recipe })
    return recipe
  }

  @Mutation(returns => Boolean)
  public async removeRecipe (@Args('id') id: string) {
    return this.recipesService.remove(id)
  }

  @Subscription(returns => Recipe)
  public recipeAdded () {
    return pubSub.asyncIterator('recipeAdded')
  }
}
