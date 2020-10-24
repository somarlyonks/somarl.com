
import { NotFoundException, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { NewDoctypeInput, DoctypesArgs } from './dto'
import { Doctype } from './models'
import { User } from '../user/models'
import DoctypeService from './service'
import { GqlAuthGuard, CurrentUser } from '../../shared'
import EdgeService from '../edge/service'


@Resolver(() => Doctype)
export default class DoctypeResolver {
  public constructor (
    private readonly doctypeService: DoctypeService,
    private readonly edgeService: EdgeService
  ) {}

  @Query(returns => Doctype)
  public async doctype (@Args('id') id: S) {
    const doctype = this.doctypeService.findOneById(id)
    if (!await doctype) throw new NotFoundException(id)

    return doctype
  }

  @Query(returns => [Doctype])
  public doctypes (@Args() doctypesArgs: DoctypesArgs) {
    return this.doctypeService.findAll(doctypesArgs)
  }

  @Mutation(returns => Doctype)
  @UseGuards(GqlAuthGuard)
  public async addDoctype (
    @Args('newDoctypeData') newDoctypeData: NewDoctypeInput,
    @CurrentUser() user: User
  ) {
    const doctype = await this.doctypeService.create(newDoctypeData)
    await this.edgeService.has(user.id, doctype.id)
    return doctype
  }

  @Mutation(returns => Boolean)
  public async removeDoctype (@Args('id') id: S) {
    return this.doctypeService.removeById(id)
  }
}
