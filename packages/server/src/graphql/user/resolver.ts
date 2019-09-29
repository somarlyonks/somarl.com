import { NotFoundException, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { NewUserInput } from './dto'
import { User } from './models'
import UserService from './service'
import { GqlAuthGuard, CurrentUser } from '../../shared'


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
    return await this.userService.findOneById(user.id)
  }

  @Mutation(returns => User)
  public async createUser (
    @Args('newRecipeData') newUserData: NewUserInput
  ) {
    return this.userService.create(newUserData)
  }

}
