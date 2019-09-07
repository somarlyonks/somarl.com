import { NotFoundException, UseGuards } from '@nestjs/common'
// import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { Args, Query, Resolver } from '@nestjs/graphql'
// import { PubSub } from 'apollo-server-express'

// import { NewUserInput } from './dto'
import { User } from './models'
import UserService from './service'
import { GqlAuthGuard, CurrentUser } from '../../shared'


// const pubSub = new PubSub()

@Resolver(() => User)
export default class UserResolver {
  public constructor (
    private readonly userService: UserService
  ) {}

  @Query(returns => User)
  public async user (@Args('id') id: string) {
    const user = this.userService.findOneById(id)
    if (!await user) throw new NotFoundException(id)

    return user
  }

  @Query(returns => User)
  @UseGuards(GqlAuthGuard)
  public async me (@CurrentUser() user: User) {
    // FIXME: @syu not working yet
    return await this.userService.findOneById(user.id)
  }

  // @Mutation(returns => User)
  // public async createUser (
  //   @Args('newRecipeData') newRecipeData: NewUserInput
  // ): Promise<User> {
  //   const recipe = this.userService.create(newRecipeData)
  //   pubSub.publish('recipeAdded', { recipeAdded: await recipe })
  //   return recipe
  // }

  // @Subscription(returns => User)
  // public recipeAdded () {
  //   return pubSub.asyncIterator('recipeAdded')
  // }
}
