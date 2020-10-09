
import { NotFoundException } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { NewDoctypeInput, DoctypesArgs } from './dto'
import { Doctype } from './models'
import DoctypeService from './service'


@Resolver(() => Doctype)
export default class DoctypeResolver {
  public constructor (
    private readonly doctypeService: DoctypeService
  ) {}

  @Query(returns => Doctype)
  public async doctype (@Args('id') id: S) {
    const dcotype = this.doctypeService.findOneById(id)
    if (!await dcotype) throw new NotFoundException(id)

    return dcotype
  }

  @Query(returns => [Doctype])
  public doctypes (@Args() doctypesArgs: DoctypesArgs) {
    return this.doctypeService.findAll(doctypesArgs)
  }

  @Mutation(returns => Doctype)
  public async addDoctype (
    @Args('newDoctypeData') newDoctypeData: NewDoctypeInput
  ) {
    return this.doctypeService.create(newDoctypeData)
  }

  @Mutation(returns => Boolean)
  public async removeDoctype (@Args('id') id: S) {
    return this.doctypeService.removeById(id)
  }
}
