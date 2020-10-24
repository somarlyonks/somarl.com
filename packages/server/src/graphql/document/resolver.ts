
import { NotFoundException } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { NewDocumentInput, DocumentArgs } from './dto'
import { Document } from './models'
import DocumentService from './service'


@Resolver(() => Document)
export default class DocumentResolver {
  public constructor (
    private readonly documentService: DocumentService
  ) {}

  @Query(returns => Document)
  public async document (@Args('id') id: S) {
    const document = this.documentService.findOneById(id)
    if (!await document) throw new NotFoundException(id)

    return document
  }

  @Query(returns => [Document])
  public documents (@Args() documentArgs: DocumentArgs) {
    return this.documentService.findAll(documentArgs)
  }

  @Mutation(returns => Document)
  public async addDocument (
    @Args('newDocumentData') newDocumentData: NewDocumentInput
  ) {
    return this.documentService.create(newDocumentData)
  }

  @Mutation(returns => Boolean)
  public async removeDocument (@Args('id') id: S) {
    return this.documentService.removeById(id)
  }
}
