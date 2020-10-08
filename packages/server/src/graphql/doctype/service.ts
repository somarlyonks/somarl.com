
import { Injectable } from '@nestjs/common'

import { NewDoctypeInput, DoctypesArgs } from './dto'
import { IDoctypeService } from './specs'
import { DoctypeRepo } from './repos'


@Injectable()
export default class DoctypeService implements IDoctypeService {
  public constructor (
    public readonly doctypeRepo: DoctypeRepo
  ) {}

  public async create (data: NewDoctypeInput) {
    return this.doctypeRepo.create(data)
  }

  public async findOneById (id: S) {
    return this.doctypeRepo.findOne(id)
  }

  public async findAll (recipesArgs: DoctypesArgs) {
    return this.doctypeRepo.find(recipesArgs)
  }

  public async removeById (id: S) {
    return this.doctypeRepo.deleteOne(id)
  }
}
