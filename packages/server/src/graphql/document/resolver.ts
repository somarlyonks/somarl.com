
import { NotFoundException } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { NewDocumentInput, DocumentArgs } from './dto'
import { Document } from './models'
import DocumentService from './service'


@Resolver(() => Document)
export default class DocumentResolver {
  public constructor (
    private readonly doctypeService: DocumentService
  ) {}

  @Query(returns => Document)
  public async doctype (@Args('id') id: S) {
    const dcotype = this.doctypeService.findOneById(id)
    if (!await dcotype) throw new NotFoundException(id)

    return dcotype
  }

  @Query(returns => [Document])
  public doctypes (@Args() doctypesArgs: DocumentArgs) {
    return this.doctypeService.findAll(doctypesArgs)
  }

  @Mutation(returns => Document)
  public async addDoctype (
    @Args('newDoctypeData') newDoctypeData: NewDocumentInput
  ) {
    return this.doctypeService.create(newDoctypeData)
  }

  @Mutation(returns => Boolean)
  public async removeDoctype (@Args('id') id: S) {
    return this.doctypeService.removeById(id)
  }
}
