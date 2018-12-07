
import { Injectable } from '@nestjs/common'

import { NewDocumentInput, DocumentArgs } from './dto'
import { IDocumentService } from './specs'
import { DocumentRepo } from './repos'


@Injectable()
export default class DocumentService implements IDocumentService {
  public constructor (
    public readonly documentRepo: DocumentRepo
  ) {}

  public async create (data: NewDocumentInput) {
    return this.documentRepo.create(data)
  }

  public async findOneById (id: S) {
    return this.documentRepo.findOne(id)
  }

  public async findAll (recipesArgs: DocumentArgs) {
    return this.documentRepo.find(recipesArgs)
  }

  public async removeById (id: S) {
    return this.documentRepo.deleteOne(id)
  }
}
