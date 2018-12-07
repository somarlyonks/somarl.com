import { Injectable } from '@nestjs/common'

import { NewImageInput, ImagesArgs } from './dto'
import { IImageService } from './specs'
import { ImageRepo } from './repos'


@Injectable()
export default class ImageService implements IImageService {
  public constructor (
    public readonly imageRepo: ImageRepo
  ) {}

  public async create (data: NewImageInput) {
    return this.imageRepo.create(data)
  }

  public async findOneById (id: S) {
    return this.imageRepo.findOne(id)
  }

  public async findAll (recipesArgs: ImagesArgs) {
    return this.imageRepo.find(recipesArgs)
  }

  public async removeById (id: S) {
    return this.imageRepo.deleteOne(id)
  }
}
