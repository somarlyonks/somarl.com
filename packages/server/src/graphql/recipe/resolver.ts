import { NotFoundException } from '@nestjs/common'
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'apollo-server-express'

import { NewRecipeInput, RecipesArgs } from './dto'
import { Recipe } from './models'
import RecipeService from './service'


const pubSub = new PubSub()

@Resolver(() => Recipe)
export default class RecipeResolver {
  public constructor (
    /**
     * @description technically it should be written like this
     *
     *   `@Inject('RecipeService') private readonly recipeService: IRecipeService`
     *
     *   We are supposed to import only the interfaces from './specs' which makes
     *   dependency injection resonable.
     *   It directly depends on the implementation here because only in this way
     *   can we goto the injected implementation code.
     */
    private readonly recipeService: RecipeService
  ) {}

  @Query(returns => Recipe)
  public async recipe (@Args('id') id: string): Promise<Recipe> {
    const recipe = this.recipeService.findOneById(id)
    if (!await recipe) throw new NotFoundException(id)

    return recipe as Promise<Recipe>
  }

  @Query(returns => [Recipe])
  public recipes (@Args() recipesArgs: RecipesArgs): Promise<Recipe[]> {
    return this.recipeService.findAll(recipesArgs)
  }

  @Mutation(returns => Recipe)
  public async addRecipe (
    @Args('newRecipeData') newRecipeData: NewRecipeInput
  ): Promise<Recipe> {
    const recipe = this.recipeService.create(newRecipeData)
    pubSub.publish('recipeAdded', { recipeAdded: await recipe })
    return recipe
  }

  @Mutation(returns => Boolean)
  public async removeRecipe (@Args('id') id: S) {
    return this.recipeService.removeById(id)
  }

  @Subscription(returns => Recipe)
  public recipeAdded () {
    return pubSub.asyncIterator('recipeAdded')
  }
}
